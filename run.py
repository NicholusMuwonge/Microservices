from Users.app import app
from Tasks.controllers import app as taskApp


if __name__ == "__main__":
    app.run()
    taskApp.run()
