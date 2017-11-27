'use strict';
//import alert from 'alert-node';
//var popup = require('popups');
var enp = require('./encrypt_decrpt.js');
var fs = require('fs');
var mysql = require('mysql');
var util = require('util');
//var app = express();
var userEmail;

function getUserDetails(res){
	
	console.log("Email = "+userEmail);
	// Create connections with MySql
	var con = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "Almas1234",
			database: "test"
	});
	// Create Connection
	con.connect(function(err) {
				if (err)
					throw err;
				console.log("Connected!");
			});
	var sql = util.format('select * from users where Email=("%s")',userEmail);
	con.query(sql, function(err, result, fields) {
		if (err)
			throw err;
		
		//Return if users exists in the DB.
		console.log(result[0]);
		res.send(result[0]);
	});
}

function authRegisteredUsers(email, password,res)
{
	userEmail=email;
	// Create connections with MySql
	var con = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "Almas1234",
			database: "test"
	});

	// Create Connection
	con.connect(function(err) {
				if (err)
					throw err;
				console.log("Connected!");
			});

	//Check if email exists
	var sql = util.format('select * from users where Email=("%s")',email);
	//var sql = util.format("select Email from users");
	con.query(sql, function(err, result, fields) {
		if (err)
			throw err;
		
		//Return if users exists in the DB.
		console.log(result[0]);
		
		if(result[0] != null){
			//It return some row - check username password matches.
			if(result[0].Email == email && result[0].Password == password){
				console.log("User Authenticated");
				res.send("Authenticated");				
			}
			else {
				console.log("Email and Password doesnot matches, Please check");
				res.send("misMatches");				
			}
		}
		else{
			console.log("User does not Exist, Registerd please");
			res.send("notExist");
		}
	});
}
exports.authRegisteredUsers=authRegisteredUsers;
exports.getUserDetails=getUserDetails;
exports.userEmail=userEmail;