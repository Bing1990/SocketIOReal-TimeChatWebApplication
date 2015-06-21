var express = require('express');
var router = express.Router();
var userDb = require("../db");

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'SocketIO Express Chat Application' });
});

router.post('/', function(req, res, next) {
  //build req.body
   var user ={}
   
   user.name =req.body.name;
   //save user

   userDb.insert(user,function(err,savedNewUser){

    console.log(JSON.stringify(req.body));

    console.log('req.body.name', req.body['name']);

    if(!err){
       
     //res.render('index', { title: 'insert username to neDB succssful!'});

      console.log('insert username to neDB succssful!');

    }else{
      
      res.send("Some Error!");
      
       }
   });
   
   /*
   userDb.remove({user:username},function(err,RemovedUser){

     io.sockets.emit('deletedUser');

     console.log(username +":" + 'deletedUser');

     render("users");

      });

    */  
});


module.exports = router;
