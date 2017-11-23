'use strict';
var express = require('express'),
    http = require('http'),
    path = require('path'),
    bodyParser= require('body-parser');
//var reg= require("./public/UTILManager/register.js");
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var app = express();
var router = express.Router();
app.set('port', 1234);
app.use(express.static(path.normalize(__dirname + '/public/angular')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing       application/x-www-form-urlencoded


// Login to Register Page
app.get('/register', function(req, res) {
    var name = 'User is Valid .... Authenticated';
    res.sendFile(__dirname + '/public/angular/Register.html');
});



http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

console.log("Listening at http://localhost:1234")