var connection = require('mysql');
var db_config = require('../config/db_config');

var mysql = connection.createConnection(db_config);

exports.all = function(callback){

        mysql.query('SELECT * FROM Users', function (err, results, fields) {

            if(err){

                console.log("ERR DB SELECT all : " + err);

            }else {

                console.log('DB SELECT all results : ' + JSON.stringify(results));

            }
            callback(err, results, fields);
        })

};

exports.updateName = function(name, uid, callback){

        mysql.query('UPDATE Users SET name=? WHERE uid=?', [name, uid], function(err, results, fields){
            if(err){

                console.log("ERR DB UPDATE updateName : " + err);

            }else {

                console.log('DB UPDATE updateName results : ' + JSON.stringify(results));

            }

            callback(err, results, fields);

        })

};

exports.createUser = function(uid, password, name, level, callback){

    mysql.query('INSERT INTO Users (uid, password, name, level) VALUES (?,?,?,?)', [uid, password, name, 0], function(err, results, fields){
        if(err){

            console.log("ERR DB INSERT createUser : " + err);

        }else {

            console.log('DB INSERT createUser results : ' + JSON.stringify(results));

        }

        callback(err, results, fields);
    })

};

exports.selectUserWhereId = function(uid, callback){

    mysql.query("SELECT * FROM Users WHERE uid = ?", uid, function(err, results, fields){

        if(err){

            console.log("ERR DB SELECT selectUserWhereId : " + err);

        }else {

            console.log('DB SELECT selectUserWhereId results : ' + JSON.stringify(results));

        }

        callback(err, results, fields);

    })

};

exports.updateUserWhereUid = function(password, name, uid, callback){

    mysql.query('UPDATE Users SET password=?, name=? WHERE uid=?', [password, name, uid], function(err, results, fields){

        if(err){

            console.log("ERR DB UPDATE updateUserWhereUid : " + err);

        }else {

            console.log('DB UPDATE updateUserWhereUid results : ' + JSON.stringify(results));

        }

        callback(err, results, fields);

    })

}