To do App 

Frontend Part of the application is written in react and can be set up locally by :

- cd Frontend
- cloning the repository
- running `npm i` to install all dependencies
- run `npm start`


The following Functionalities are working 
- signin
- sign up
- get all users
- get all tasks



Backend Apis:

Users Module:

# This is an application that handles user authentication and authorization and User data.

Setup:
- create a virtualenv
- pip install -r requirements.txt
- py run.py
(This runs on port 5001 locally so all user endpoints are running on that port )


endpoints:
- `/signup`-> sample response({
                'success': True,
                'message': 'nicholus created successfully'
        })
        fields: username, email, password

 - `/login`-> sample response({
                'success': True,
                'message': 'nicholus created successfully'
        })
        fields:email, password

- `/users/` -> get all users

- `/users/<int:id>` -> Retrieving a particular user

-`/users/<int:id>/edit` -> Updating a username

-`/users/<int:id>/delete` -> delete user

Tasks Module:
this runs on port 5000 locally

- `/create_task` creates new task

- `/get_tasks/` retrieve all the tasks

- `/get_task/<username>` retrive all a single user created tasks

-`/get_single_task/<int:id>` retrieve single task by id

- `/tasks/<int:id>/edit` edit single task if one is the author.

