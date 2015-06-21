var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var userDb = require("./db");
//var sockets =require('./routes/sockets');

var app = express();

var server =app.listen(3000);
var io = require('Socket.io').listen(server);


app.use(express.static('www'));

app.use(express.static(__dirname + '/public'));



io.on('connection', function(socket){
  
  //set username associated with this socket, this value will work both in server and client side

  socket.on ('join',function(name){

    socket.username =name;

   });

  socket.on('chat message', function(msg){

    var username = socket.username;

    io.emit('chat message', username + " :" + msg);
   
    //broadcast Message
    socket.broadcast.emit("messages",username + " :" +msg);
    //console.log('Client connected');

    console.log(username + 'joined the chat');

    console.log(msg);


  });

 // disconnect event
  socket.on('disconnect', function(msg){

    var user ={}

    var username = socket.username;

    io.emit('chat message', username + " :" + ' diconnected');

    socket.broadcast.emit("messages",username + " :" + ' diconnected');

    console.log(username + " :" + ' diconnected');


     userDb.remove(user,function(err,RemovedUser){

     io.sockets.emit('deletedUser');

     console.log(username +":" + 'deletedUser');


     });  
 
  });

});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
//app.user('/sockets',sockets);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
