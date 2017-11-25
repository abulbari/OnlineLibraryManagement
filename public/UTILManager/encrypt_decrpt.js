var crypto = require("crypto")
//var fs = require("chai").assert;
var fs = require('fs');

function encrypt(data) {
	var key = "supersecretkey";
        var cipher = crypto.createCipher('aes-256-cbc', key);
        var crypted = cipher.update(data, 'utf-8', 'hex');
        crypted += cipher.final('hex');

        return crypted;
}

function decrypt(encrypteddata) {
	var key = "supersecretkey";
        var decipher = crypto.createDecipher('aes-256-cbc', key);
        var decrypted = decipher.update(encrypteddata, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

        return decrypted;
}


exports.encrypt = encrypt;
exports.decrypt = decrypt;
