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
      $("#people").append(`<li>${person.name}: ${availability}  </li>`);
    }
   
  }

  function changeAvailability(){
    // var text=$('#thingText').val();
     //var color=$("#thingColor").val();
    isAvailable = !isAvailable;

     var body = { "name": "Ryleigh", "id":socket.id, "isAvailable": isAvailable  };
 
     $.ajax({
         type: "POST",
         url: "/availability",
         data: JSON.stringify(body),
         contentType: "application/json; charset=utf-8",
         dataType: "json",
     });
  }    

 

 // socket.on("people", (data) => { //Anonymous expression, when this event happens call this function
        //     console.log(data);
        //     updatePeopleList();
        //   }); //this segment of code handles a "people" event from the server (this and the two lines above) 
        //formerly on line 17
         //const io = require("socket.io-client"); //this is the module library loader that's being linked and it makes sure socketio exists
        //  This is the custom javascript code where interactions with the API and web sockets occur.

// It is also where JQuery is used to update parts of the HTML page when server data is received.



// The first part is the initialization that runs when the browser page loads.

// Here, the client web socket connects to the server web socket.

// It is also where the javascript will handle the “people” socket event from the server




// The update people list function is called when the “people” socket event is received from the server.

// JQuery is used to clear the current list displayed on the HTML page

// We then loop through each person, and create a row to be displayed on the HTML with their available status




// The change availability function is called when the HTML button is clicked. 

// The available status is toggle, then an API call is made to the web server to update its list of people.

