import threading
from Tasks import Tasks
from Users import User

def runFlaskApp1():
    Tasks.run(host='127.0.0.1', port=5000, debug=False, threaded=True)

def runFlaskApp2():
    User.run(host='127.0.0.1', port=5001, debug=False, threaded=True)


if __name__ == "__main__":
    task = threading.Thread(target=runFlaskApp1)
    user = threading.Thread(target=runFlaskApp2)
    task.start()
    user.start()
