var mysql = require('mysql');

	// Create connections with MySql
	var con = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "Almas1234",
			database: "test"
	});

	// Create table Users
	con.connect(function(err) {
				if (err)
					throw err;
				console.log("Connected!");
				var sql = "CREATE TABLE users (Email VARCHAR(255), Password VARCHAR(255)," +
						"FirstName VARCHAR(255), LastName VARCHAR(255)," +
						"Sex VARCHAR(255), DateOfBirth VARCHAR(255) )";
				con.query(sql, function(err, result) {
					if (err)
						throw err;
					console.log("Table created");
				});

			});