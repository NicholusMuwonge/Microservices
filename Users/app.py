from flask import Flask, json, jsonify, request
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity, JWTManager
    )
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import re
import os
import datetime
from .database import setup_db, User, db



app = Flask(__name__)
JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'os.environ.get()'
setup_db(app)
CORS(app, resources={r"*": {"origins": '*'}})




@app.after_request
def after_request(response):
    response.headers.add(
        'Access-Control-Allow-Headers', 'Content-Type, Authorization, true')
    response.headers.add(
        'Access-Control-Allow-Methods', 'POST, PATCH, PUT, GET, OPTIONS, DELETE'
    )
    return response


class UserLogic:


    @app.route('/', methods=['GET'])
    def homeDo():
        return 'ice'

    @app.route('/signup', methods=['POST'])
    def user_signup():
        users = User.query.all()
        data = request.get_json()
        if not data or data == '':
            return jsonify({
                'success': 'false',
                'message': 'fill in the missing fields'
            }), 400

        elif 15<len(data['username'])<3 or not data['username'].isalnum() or \
                bool(User.query.filter_by(username=data['username']).first()):
            return jsonify({
                'success': 'false',
                'message': 'incorrect username'
        }), 400

        elif not re.match('[^@]+@[^@]+\.[^@]+', data['email']) or \
                bool(User.query.filter_by(email=data['email']).first()):
            return jsonify({
                'success': 'false',
                'message': 'incorrect email format'
            }), 400

        elif 8>len(data['password'])>12 or not data['password'].isalnum():
            return jsonify({
                'success': 'false',
                'message': 'incorrect password'
        }), 400

        else:
            final_data= User(
                username= data['username'],
                email=data['email'],
                password=generate_password_hash(data['password'])
            )
            db.session.add(final_data)
            db.session.commit()

            return jsonify({
                'success': True,
                'message': '{} created successfully'.format(data['username'])
        }), 200
        
    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        keys = ('email','password')        
        if not set(keys).issubset(set(data)):
            return jsonify({
                'success': 'false',
                'message': 'fill in the missing fields'
            }), 400
        
        if not bool(User.query.filter_by(email=data['email']).first()):
            return jsonify({
                'success': 'false',
                'message': 'incorrect email or email'
            }), 400
        user_search = User.query.filter_by(email=data['email']).first()
        password_check = check_password_hash(user_search.password, data['password'])
        if not password_check:
            return jsonify({
                'success': 'false',
                'message': 'incorrect password or email'
            }), 400
        else:
            
            return jsonify({
                'success': True,
                'message': 'welcome back {} '.format(user_search.username),
                'username': user_search.username,
                'is_admin': user_search.is_Admin,
                'token': create_access_token(
                    identity=user_search.username, expires_delta=datetime.timedelta(hours=48)
                    ),
        }), 200            

class Roles:

    @app.route('/users/')
    @jwt_required
    def get_all_users():
        try:
            data = User.query.all()
            return jsonify(
                {
                    'success': True,
                    'data': [i.format() for i in data]
                }
            ), 200
        except Exception as error:
            return error
        

    @app.route('/users/<int:id>')
    @jwt_required
    def get_a_single_user(id):
        try:
            data=User.query.filter_by(id=id)
            if not data:
                return jsonify({
                    'success': 'false',
                    'message': 'no results found'
            }), 404
            else:
                return jsonify(
                    {
                        'success': True,
                        'data': [i.format() for i in data],
                    }
                ),200
        except Exception as error:
            return error


    @app.route('/users/<int:id>/edit', methods=['PATCH'])
    @jwt_required
    def edit_a_single_user(id):
        try:
            requests = request.get_json()
            data=User.query.filter(User.id==id).one_or_none()
            if not data:
                return jsonify({
                    'success': 'false',
                    'message': 'no results found'
                }), 404
            data.username = requests.get('username')
            db.session.commit()        
            return jsonify(
                {
                    'success': True,
                    'message': "updated",
                }
                ), 200
        except Exception as error:
            return error

    @app.route('/users/<int:id>/delete', methods=['DELETE'])
    @jwt_required
    def delete_a_single_user(id):
        try:
            data=User.query.filter_by(id=id).one_or_none()
            if not data:
                return jsonify({
                    'success': 'false',
                    'message': 'no results found'
                    }), 404

            data.delete()
            return jsonify(
                {
                    'success': True,
                    'mesage': '{} deleted'.format(id),
                }
            ), 200
        except Exception as error:
            return error
