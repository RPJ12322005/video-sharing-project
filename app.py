from flask import Flask, render_template, jsonify,request
from flask_socketio import SocketIO
app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app, cors_allowed_origins="*")


### name + an ID for each person
peopleAvailable=[]

  
@app.route('/')
def home():
   return render_template('index.html')

@app.route("/availability", methods=['POST'])
def handleAvailability():
   data = request.json
   updatePeople(data)
   socketio.emit("people", peopleAvailable)
   return jsonify(data)


@app.route("/watchMovie", methods=['POST'])
def handleWatchMovie():
   data = request.json
   receiverSocketId = data["receiverSocketId"]
   socketio.emit('ask', data, room=receiverSocketId)
   return jsonify(data)
   ##socketIo.emit(`person.{data.receiverId}`, data)
   ##io.sockets.socket(savedSocketId).emit(...)


   ### we will need: recievers ID, senders name

@app.route("/confirmMovie", methods=['POST'])   
def handleMovieConfirmation():
   data = request.json
   receiverSocketId = data["receiverSocketId"]
   socketio.emit('yes', data, room=receiverSocketId)
   return jsonify(data)

def updatePeople(data):
   for person in peopleAvailable:
      if person["id"] == data["id"]:
         person["name"]=data["name"]
         person["isAvailable"] = data["isAvailable"]
         return
   peopleAvailable.append(data)

@app.route("/playSyncMovie", methods=['POST'])
def playSyncVideo():
   data = request.json
   receiverSocketId = data["receiverSocketId"]
   senderSocketId = data["senderSocketId"]
   socketio.emit('play', data, room=receiverSocketId)
   socketio.emit('play', data, room=senderSocketId)
   return jsonify(data)









if __name__ == '__main__':
   socketio.run(app, debug=True)
   



