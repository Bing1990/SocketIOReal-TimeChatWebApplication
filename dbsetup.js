var dbFile = require("./db");
/*
//create data Db
var DataStore = require("nedb");
var dbFile = new DataStore({filename:"data.db",autoload:"true"});
*/
dbFile.ensureIndex({fieldName: 'name'});
/*

var user1 ={name:"Bingyu"};
var user2 ={name:"Tianjiao"};
var user3 ={name:"jason"};

dbFile.insert(user1, function(err, savedUser) {
	console.log("saved user1");
	console.log(user1);
});

dbFile.insert(user2, function(err, savedUser) {
	console.log("saved user2");
	console.log(user2);
});

dbFile.insert(user3, function(err, savedUser) {
	console.log("saved user3");
	console.log(user3);
});
*/