var express = require('express');
var router = express.Router();
var db_config = require('../config/db_config.json')
var moment = require('moment');
var connection = require('mysql');
var userDB = require('../models/user');

var mysql = connection.createConnection(db_config);

router.use(function(req, res, next){

    console.log('/admin : ' + moment().format());

    next();

});

router.get('/', function(req, res, next){

    console.log(req.session.uid, req.session.level);
    var sendData = {};

    if(req.session.uid === 'xxxx' && req.session.level === 1){

        userDB.all(function(err, results, fields){

            if(err){

                res.redirect('?alertMessage='+ 'DB 오류');

            } else {

                sendData.memberArr = results;
                console.log(JSON.stringify(results));

                res.render('adminEdit', sendData);

            }

        });
    }else{

        res.redirect('?alertMessage='+ '관리자가 아님');

    }
});

router.post('/edit', function(req, res, next){

    var uid = req.body.uid;
    var name = req.body.name;
    console.log("이름 : " + name + "\n아이디: " + uid);

    userDB.updateName(name, uid, function(err, results, fields){

        if(err){

            res.status(400).send('');

        } else {

            res.send({
                "success": 1,
                "msg" : "정상적으로 변경되었습니다.",
                "data" : {
                    "name" : name,
                    "uid" : req.session.uid
                }
            });

        }

    });

});

module.exports = router;