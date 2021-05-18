
(function(){

    //const io = require("socket.io-client"); //this is the module library loader that's being linked and it makes sure socketio exists
    function initialize (){
        var domain = '127.0.0.1';
        var port = '5000';
    
        var socket = io.connect('http://' + domain + ':' + port);
        
        socket.on("connect", () => {
            console.log(socket.id); // "G5p5..."
            particpantsInfo();
          });
          

        socket.on("people", (data) => {
            console.log(data);
          }); //this segment of code handles a "people" event from the server (this and the two lines above)
    }

    function particpantsInfo(){
       // var text=$('#thingText').val();
        //var color=$("#thingColor").val();
        var body = { "name": "Ryleigh", "id":113 };
     
    
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


    initialize();
  })();
  