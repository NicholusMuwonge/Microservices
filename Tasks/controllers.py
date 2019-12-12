import os
from flask import Flask, json, jsonify, request
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity, JWTManager
    )
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, setup_db, Tasks


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
        author = get_jwt_identity()

        all_tasks = Tasks.query.all()
        data = request.get_json()
        keys =("description", "state")
        if not data or data == '':
            return jsonify({
                'success': 'false',
                'message': 'fill in the missing fields'
            }), 400
        elif data['state'] not in "Done":
            return jsonify({
                'success': 'false',
                'message': 'input proper state'
        }), 400
        else:
            final_data= Tasks(
                description=data['description'],
                state=data['state'],
                user=author)

            db.session.add(final_data)
            db.session.commit()

            return jsonify({
                'success': True,
                'message': 'description created successfully',
                'data': [i.format() for i in all_tasks]
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
        

    @app.route('/get_task/<username>')
    @jwt_required
    def get_a_single_user_tasks(username):
        try:
            data=Tasks.query.filter(Tasks.user==username)
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


    @app.route('/get_single_task/<int:id>')
    @jwt_required
    def get_a_single_task(id):
        try:
            data=Tasks.query.filter(Tasks.id==id)
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
        try:
            requests = request.get_json()
            data=Tasks.query.filter(Tasks.id==id).first()
            if not data:
                return jsonify({
                    'success': 'false',
                    'message': 'no results found'
                }), 404
            if data.user != user:
                 return jsonify({
                    'success': 'false',
                    'message': 'You are not the author'
                }), 400
            data.description = requests['description']
            data.state = requests['state']
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
