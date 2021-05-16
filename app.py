from flask import Flask, render_template, jsonify,request
from flask_socketio import SocketIO
app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)

  
@app.route('/')
def home():
   return render_template('index.html')

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)















if __name__ == '__main__':
   socketio.run(app, debug=True)
   



