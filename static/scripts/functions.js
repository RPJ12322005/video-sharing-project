var socket=null;
var isAvailable=false;

(function(){
   
    function initialize (){
        var domain = '127.0.0.1';
        var port = '5000';
    
        socket = io.connect('http://' + domain + ':' + port);
        
        socket.on("connect", () => {
            console.log(socket.id); // "G5p5..."
        
        });
       
        socket.on("people", (data) => updatePeopleList(data)); //when the list gets a new element the "update people" funstion is called
    }

    initialize();
  })();
  
  function updatePeopleList(people){
    $("#people").empty();
    for (const person of people) {
      var availability = (person.isAvailable ? "Available" : "Unavailable");
      var button = `<button onclick="watchMovie('${person.id}')" type="button" class="watch-movie" id="watch">Lets watch a movie</button>`;
      $("#people").append(`<li>${person.name}: ${availability} ${button} </li>`);
    }
   
  }

  function changeAvailability(){
    var personName = $('#personName').val();
    
    isAvailable = !isAvailable;
    updateButton();

     var body = { "name": personName, "id": socket.id, "isAvailable": isAvailable  };
 
     $.ajax({
         type: "POST",
         url: "/availability",
         data: JSON.stringify(body),
         contentType: "application/json; charset=utf-8",
         dataType: "json",
     });
  }    
  
  function updateButton(){
    var buttonText = (isAvailable ? "Availability=True" : "Availability=False" );
    $("#availability").html(buttonText);
  }
 
  function watchMovie(socketId){
    
  }





 // socket.on("people", (data) => { //Anonymous expression, when this event happens call this function
        //     console.log(data);
        //     updatePeopleList();
        //   }); //this segment of code handles a "people" event from the server (this and the two lines above) 
        //formerly on line 17
         //const io = require("socket.io-client"); //this is the module library loader that's being linked and it makes sure socketio exists
        //  This is the custom javascript code where interactions with the API and web sockets occur.

