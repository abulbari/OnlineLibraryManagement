'use strict';
//import alert from 'alert-node';
//var popup = require('popups');
var enp = require('./encrypt_decrpt.js');
var fs = require('fs');
var mysql = require('mysql');
var util = require('util');
//var app = express();

function checkRegisteredUsers(email, password, fname, lname, sex, dob, res)
{
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
			//user exists
			console.log("User Exist, Back to Register page");
			//need alert window + redirect to register page
			//redirect to register page
		}
		else{
			// insert into table
			var sql = util.format('INSERT INTO users (Email, Password, FirstName, LastName, Sex, DateOfBirth) VALUES ("%s","%s","%s","%s","%s","%s")',email,password, fname, lname, sex, dob);
			con.query(sql, function(err, result) {
				if (err)
					throw err;
				console.log("1 row created");
			});
			console.log("User does not Exist, Registerd it then back to login page"+result);
			//need alert window + redirect to Login page
		}
	});
}
exports.checkRegisteredUsers=checkRegisteredUsers;