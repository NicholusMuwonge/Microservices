import sys
sys.path.append(".")
from flask import Flask, json, jsonify, request

from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity, JWTManager
    )
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import re
import os
import datetime
from models import db, setup_db, Tasks
from ..Users.database import User


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


class RolesLogic:
    
    @app.route('/create_task', methods=['POST'])
    @jwt_required
    def user_signup():
        user = get_jwt_identity()
        user_id = user[0]

        users = Tasks.query.all()
        data = request.get_json()
        keys =("description", "state")
        if not data or data == '' :
            return jsonify({
                'success': 'false',
                'message': 'fill in the missing fields'
            }), 400

        elif len(data['description'])<3 or not data['description']:
            return jsonify({
                'success': 'false',
                'message': 'thi seems to be in place already'
        }), 400

        elif data['state'] not in "Done":
            return jsonify({
                'success': 'false',
                'message': 'input proper state'
        }), 400
        else:
            created = User.query.filter(id==user_id).one_or_none()
            final_data= Tasks(
                description=data['description'],
                state=data['state'],
                user_id=created)

            db.session.add(final_data)
            db.session.commit()

            
            return jsonify({
                'success': True,
                'message': 'description created successfully',
                'data': {
                    "description": data['description'],
                    "state": data['state'],
                    "created_by": created.username
                }
                }), 200
        
    

    @app.route('/get_tasks/')
    @jwt_required
    def get_all_users():
        try:
            data = Tasks.query.all()
            return jsonify(
                {
                    'success': True,
                    'data': [i.format() for i in data]
                }
            ), 200
        except Exception as error:
            return error
        

    @app.route('/get_task/<int:id>')
    @jwt_required
    def get_a_single_user_tasks(id):
        user = get_jwt_identity()
        user_id = user[0]
        try:
            data=Tasks.query.filter(user_id=id).one_or_none()
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


    @app.route('/tasks/<int:id>/edit', methods=['PATCH'])
    @jwt_required
    def edit_a_single_description(id):
        user = get_jwt_identity()
        user_id = user[0]
        try:
            requests = request.get_json()
            data=User.query.filter(Tasks.id==id).one_or_none()
            if not data:
                return jsonify({
                    'success': 'false',
                    'message': 'no results found'
                }), 404
            
            responses=[True, False]
            if requests['role'] not in responses:
                return jsonify({
                    'success': 'false',
                    'message': 'invalid response'
                    }), 400
            data.description = requests.get('description')
            data.state = requests.get('state')
            db.session.commit()        
            return jsonify(
                {
                    'success': True,
                    'message': "updated",
                }
                ), 200
        except Exception as error:
            return error

if __name__ == "__main__":
    app.run(debug=True)
