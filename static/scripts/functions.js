function initialize (){
    var domain = '127.0.0.1';
    var port = '5000';

    var socket = io.connect('http://' + domain + ':' + port);
}
(function(){
    initialize();
  })();
  