'use strict';
var enp = require('./encrypt_decrpt.js'); 
var fs = require('fs');
var uName = '';
var passWd = '';

function storeRegisteredUser(email,password,fname,lname,sex,dob,res)
{
	var JsonData=
	{
			Email: email,
			Fname: fname,
			Lname: lname,
			Password: encryptedPass,
			Sex: sex,
			Dob:dob,
			
	}
	fs.writeFile("C:\\occ_files\\registeredUsers\\"+filename, JSON.stringify(JsonData), (err) => {
		if (err) 
		{
			console.error(err);
			return;
		};
		console.log("File has been created");
	});
} 
function checkRegisteredUsers(filename,email,password,username,response){
	if (fs.existsSync("C:\\occ_files\\registeredUsers\\"+filename)) {
	console.log("User is registered, Please login with CCSSO account");
	// user is valid store username
	console.log("when already registered "+ uName);
	response.send("valid");
	} else{
		 console.log("when new user "+ username);
		checkValidUser(filename,email,password,username,response);
	}
}

function checkValidUser(filename,email,passwd,username,response){
	var hostname = "cloud.ams03.isc4sb.com";
	var host = {
			server:        {     
				host: hostname,
				userName: username,
				password: passwd,
			},
			commands: [ "pwd" ],
			 msg: {
			        send: function (message) {
			            console.log(message);
			        }
			    },
			    connectedMessage: "Connected",
			    readyMessage: "Ready",
			    closedMessage: "Completed",
			
	};
	
	var SSH2Shell = require ('ssh2shell'),
	// Create a new instance passing in the host object
	 SSH = new SSH2Shell(host);
	
	SSH.on('commandProcessing',function (command, response, sshObj, stream) {
	    console.log("commandProcessingEvent command: " + command + " response:" + response);
	}).on('commandTimeout',function( command, response, sshObj, stream, connection ) {
	   console.log("CommandTimeout: command: "+command + " response:"+response);
	 })
	.on('commandComplete', function (command) {
	    console.log("CommandComleteEvent command: " + command );
		var encryptedPass = enp.encrypt(passwd);
		console.log("when Valid "+ uName);
		storeRegisteredUser(filename,email,username,encryptedPass,response);
	    response.send("valid");
	}).on('end', function (sessionText, sshObj) {
	    console.log("End event: " + sessionText);
	}).on('error', function(err) {
		  console.log('Connection :: error :: ' + err);
		  response.send("Invalid");
	});
	SSH.connect();
}
exports.checkRegisteredUsers=checkRegisteredUsers;
exports.uName=uName;
exports.passWd=passWd;