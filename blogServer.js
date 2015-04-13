var express = require('express');
var app = express();
var sql = require('sqlite3').verbose;
var ejs = require("ejs");
//Designate where ejs files are kept
app.set("view_engine", "ejs");
//read body of req for url manipulation
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
//browser override for put and delete
var metOverride = require('method-override');
app.use(metOverride('_method'));

var port = 3000;


//liten to server
app.listen(3000);
console.log('Listening on 3000');

