var connection = require('mysql');
var db_config = require('../config/db_config');

var mysql = connection.createConnection(db_config);

exports.all = function(callback){

        mysql.query('SELECT * FROM Members', function (err, results, fields) {

            if(err){

                console.log("ERR DB SELECT all : " + err);

            }else {

                console.log('DB SELECT all results : ' + JSON.stringify(results));

            }
            callback(err, results, fields);
        })

};

exports.updateName = function(name, uid, callback){

        mysql.query('UPDATE Members SET name=? WHERE uid=?', [name, uid], function(err, results, fields){
            if(err){

                console.log("ERR DB UPDATE updateName : " + err);

            }else {

                console.log('DB UPDATE updateName results : ' + JSON.stringify(results));

            }

            callback(err, results, fields);

        })

};

exports.createUser = function(uid, password, name, level, callback){

    mysql.query('INSERT INTO Members (uid, password, name, level) VALUES (?,?,?,?)', [uid, password, name, 0], function(err, results, fields){
        if(err){

            console.log("ERR DB INSERT createUser : " + err);

        }else {

            console.log('DB INSERT createUser results : ' + JSON.stringify(results));

        }

        callback(err, results, fields);
    })

};