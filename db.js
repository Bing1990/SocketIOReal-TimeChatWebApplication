var DataStore = require("nedb");
var dbFile = new DataStore({filename:"data.db",autoload:"true"});
/*
dbFile.ensureIndex({fieldName: 'name', unique: true});
*/

module.exports = dbFile;

