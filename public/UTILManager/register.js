'use strict';
var enp = require('./encrypt_decrpt.js');
var fs = require('fs');
var mysql = require('mysql');
var util = require('util');

function checkRegisteredUsers(email, password, fname, lname, sex, dob, res)
{
	// Create connections with MySql
	
	var con = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "Almas1234",
			database: "test"
	});
	// Check if the user exist in the DB

	// Create Connection
	con.connect(function(err) {
				if (err)
					throw err;
				console.log("Connected!");
			});
	//Check if email exists
	var sql = util.format('select * from users where Email = ("%s")',email);
	con.query(sql, function(err, result) {
		if (err)
			throw err;
		
		if(result){
			//user exists
		}
		else{
			//insert into table
		}
	});
	
	if(re)
	// insert into table
	var sql = util.format('INSERT INTO users (Email, Password, FirstName, LastName, Sex, DateOfBirth) VALUES ("%s","%s","%s","%s","%s","%s")',email,password, fname, lname, sex, dob);
	con.query(sql, function(err, result) {
		if (err)
			throw err;
		console.log("1 row created");
	});
	
}
exports.checkRegisteredUsers=checkRegisteredUsers;