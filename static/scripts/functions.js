var socket=null;
var isAvailable=false;
(function(){

    //const io = require("socket.io-client"); //this is the module library loader that's being linked and it makes sure socketio exists
    function initialize (){
        var domain = '127.0.0.1';
        var port = '5000';
    
        socket = io.connect('http://' + domain + ':' + port);
        
        socket.on("connect", () => {
            console.log(socket.id); // "G5p5..."
        
          });
          

       
        socket.on("people", (data) => updatePeopleList(data)); //when the list gets a new element the "update people" funstion is called

    }

    $( ".available" ).click(changeAvailability());
  
    
    $(".available").change(function() {   alert("hello");});


    initialize();
  })();
  
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
        // success: avalabilityCallBack,
         //failure: availabilityError
     });
     
 }    

 function updatePeopleList(people){
  $("#people").empty();
  for (const person of people) {
    var availability = (person.isAvailable ? "Available" : "Unavailable");
    $("#people").append(`<li>${person.name}: ${availability}  </li>`);
  }
 
}

 // socket.on("people", (data) => { //Anonymous expression, when this event happens call this function
        //     console.log(data);
        //     updatePeopleList();
        //   }); //this segment of code handles a "people" event from the server (this and the two lines above) 
        //formerly on line 17