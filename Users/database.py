import os
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


database_path = "postgres://{}@{}/{}".format(
  'postgres', 'localhost:5432', 'User'
  )
db = SQLAlchemy()


def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()


class User (db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    is_Admin = db.Column(db.String, nullable=False, default=False)
    password = db.Column(db.String, nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

    def format(self):
        return {
            'id':self.id,
            'username':self.username,
            'email':self.email,
            'is_Admin':self.is_Admin
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()
