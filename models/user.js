var connection = require('mysql');
var db_config = require('../config/db_config');

var mysql = connection.createConnection(db_config);

exports.all = function(callback){

        mysql.query('SELECT * FROM Members', function (err, results, fields) {

            if(err){
                console.log("ERR DB SELECT all : " + err);
                res.redirect('?alertMessage='+ 'DB 오류');

            }else {

                console.log('DB SELECT all results : ' + JSON.stringify(results));

                callback(err, results, fields);
                return ;
            }
        })

};

exports.updateName = function(mem_name, mem_id, callback){

        mysql.query('UPDATE Members SET mem_name=? WHERE mem_id=?', [mem_name, mem_id], function(err, results, fields){

            if(err){

                callback(err);

            } else {

                console.log('DB UPDATE updateName results : '+ JSON.stringify(results));
                console.log('DB UPDATE updateName fields : '+ JSON.stringify(fields));

                callback(null, results, fields);

            }
        })

};

