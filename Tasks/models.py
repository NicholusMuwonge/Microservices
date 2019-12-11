import os
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


database_path = "postgres://{}@{}/{}".format(
  'postgres', 'localhost:5432', 'Roles'
  )
db = SQLAlchemy()


def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()


class Tasks (db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False, default='Todo')
    user_id = db.Column(db.Integer, nullable=False)

    def __init__(self, description, state, user_id):
        self.id= id
        self.description = description
        self.state = state
        self.user_id = user_id

    def format(self):
        return {
            'id':self.id,
            'username':self.description,
            'email':self.state,
            'is_Admin':self.user_id
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()

