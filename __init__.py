from .Users import app
from .Tasks import app as taskApp


if __name__ == "__main__":
    app.run()
    taskApp.run()
