'use strict';
var express = require('express'),
    http = require('http'),
    path = require('path'),
    //expressValidator=require('express-validator'),
    bodyParser= require('body-parser');

var reg= require("./public/UTILManager/register.js");
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var app = express();
var router = express.Router();
app.set('port', 5000);
app.use(express.static(path.normalize(__dirname + '/public/angular')));
//app.use(expressValidator);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing       application/x-www-form-urlencoded


// Login to Register Page
app.get('/register', function(req, res) {
    var name = 'User is Valid .... Authenticated';
    res.sendFile(__dirname + '/public/angular/Register.html');
});

app.post('/registerUser', function(req, res) {
	 var email=req.body.email;
	 var fname=req.body.fname;
	 var password=req.body.password;
	 var lname=req.body.lname;
	 var sex=req.body.sex;
	 var dob=req.body.DOB;
	 
	 //req.assert('email', 'A vlaid email is required').isEmail();
	 //req.assert('fname', 'First name is required').notEmpty();
	 
	 reg.checkRegisteredUsers(email,password,fname,lname,sex,dob,res);

} );


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

console.log("Listening at http://localhost:5000");