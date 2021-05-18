from flask import Flask, render_template, jsonify,request
from flask_socketio import SocketIO
app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)

### name + an ID for each person
peopleAvailable=[]

  
@app.route('/')
def home():
   return render_template('index.html')

@app.route("/availability", methods=['POST'])
def handleAvailability():
   data = request.json
   peopleAvailable.append(data)
   socketio.emit("people", peopleAvailable)
   return jsonify(data)











if __name__ == '__main__':
   socketio.run(app, debug=True)
   



