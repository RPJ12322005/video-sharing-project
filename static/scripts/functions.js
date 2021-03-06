var socket=null;
var isAvailable=false;
var personName="";
var player 
(function(){
   
    function initialize (){
        var domain = '127.0.0.1';
        var port = '5000';
    
        socket = io.connect('http://' + domain + ':' + port);
        
        socket.on("connect", () => {
            console.log(socket.id); // "G5p5..."
        
        });
       
        socket.on("people", (data) => updatePeopleList(data)); //when the list gets a new element the "update people" funstion is called
        socket.on("ask", (data) => askToWatch(data));
        socket.on("yes", (data) => yesToWatch(data));
        socket.on("play", (data) => playVideo(data));
      }

    initialize();
  })();
  
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
        events: {
            onReady: initializeVideo
        }
    });
}

function initializeVideo(){

}

  function updatePeopleList(people){
    $("#people").empty();
    for (const person of people) {
      if(person.id !== socket.id){
      var availability = (person.isAvailable ? "Available" : "Unavailable");
      var button = `<button onclick="watchMovie('${person.id}')" type="button" class="watch-movie" id="watch">Lets watch a movie</button>`;
      $("#people").append(`<li>${person.name}: ${availability} ${button} </li>`);
    }
    }
   
  }

  function changeAvailability(){
     personName = $('#personName').val();
    
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
 
  function watchMovie(receiverSocketId){
    var body = { "name": personName, "senderSocketId": socket.id, "receiverSocketId": receiverSocketId  };
 
    $.ajax({
        type: "POST",
        url: "/watchMovie",
        data: JSON.stringify(body),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    });
  }

  function askToWatch(data){
    
    $.confirm({
      title: 'Want to Watch?',
      content: `Do you want to watch something with ${data.name}`,
      buttons: {
          confirm: function () {
            var body = { "name": personName, "senderSocketId": socket.id, "receiverSocketId":data.senderSocketId  };

            $.ajax({
                type: "POST",
                url: "/confirmMovie",
                data: JSON.stringify(body),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
            });
          },
          cancel: function () {
              // $.alert('Canceled!');
          },
        }
    });
  }
 

      
    

function yesToWatch(data){
  $.confirm({
    title: 'Want to Watch?',
    content: `Do you want to watch something with ${data.name}`,
    buttons: {
        confirm: function () {
          var body = { "name": personName, "senderSocketId": socket.id, "receiverSocketId":data.senderSocketId  };

          $.ajax({
              type: "POST",
              url: "/playSyncMovie",
              data: JSON.stringify(body),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
          });
        },
        cancel: function () {
            // $.alert('Canceled!');
        },
      }
  });
}
 
 function playVideo(data){
   player.playVideo();
 }

    



 // socket.on("people", (data) => { //Anonymous expression, when this event happens call this function
        //     console.log(data);
        //     updatePeopleList();
        //   }); //this segment of code handles a "people" event from the server (this and the two lines above) 
        //formerly on line 17
         //const io = require("socket.io-client"); //this is the module library loader that's being linked and it makes sure socketio exists
        //  This is the custom javascript code where interactions with the API and web sockets occur.

