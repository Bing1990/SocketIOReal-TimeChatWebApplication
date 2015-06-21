var express = require('express');
var router = express.Router();

//use database
var userDb = require("../db");

/* GET users listing. */

router.get('/', function(req, res, next) {

    res.render("user",{title:'Welcome to User router'});
   //res.send("Welcome to the user router!");
});

 

router.get('/model', function(req, res, next) {

   var user ={}

   res.send(user);
   
});

router.post('/save', function(req, res, next,name) {
  //build req.body
   var user ={}

   user.name =req.body.name;
   //save user

   userDb.insert(user,function(err,savedNewUser){

   	console.log(JSON.stringify(req.body));

    console.log('req.body.name', req.body['name']);

   	if(!err){

   		res.send('insert username to neDB succssful! ' +'<a href="/users/view">Review the logged user</a>');

   	  console.log(user);

   	}else{
      
   		res.send("Some Error!");
   	   }
   });

});


router.get('/view', function(req, res, next) {
  
  var user ={}

  var userId = req.query.id;

  user.name =req.body.name;

  userDb.find({},function(err,users){
     
     var uName = "";

     for(var i=0;i<users.length;i++){

        uName = users[i].name + ", " + uName;
     }

      res.send('<li style="color:pink;font-size:30;">'+ uName +'</li>'+'<div><a href="/">back</a></div>');
  });

/*
 router.get('/update', function(req, res, next,name) {

  res.render("user",{title:'Welcome to User router'});
  
  var user ={}

   res.send(user);

  var userId = req.query.id;

  user.name =req.body.name;

  userDb.remove({user:name},function(err,RemovedUser){

  console.log(name +":" + 'deletedUser');

      });  

});
*/

});
module.exports = router;
