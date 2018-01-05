var express = require('express');
var router = express.Router();
var db_config = require('../config/db_config.json')
var moment = require('moment');
var connection = require('mysql');
var userDB = require('../models/user');

var mysql = connection.createConnection(db_config);

router.use(function(req, res, next){

    console.log('/users : ' + moment().format());

    next();

});

/* GET users listing. */
router.get('/login', function(req, res, next) {

    res.send('respond with a resource');

});


router.get('/logout', function(req, res, next) {

    req.session.uid = undefined;
    req.session.name = undefined;
    req.session.level = undefined;

    res.redirect('/?alertMessage=' + '로그아웃 되셨습니다.');

});

router.post('/register', function(req, res, next){

    var uid = req.body.uid;
    var password = req.body.password;
    var name = req.body.name;

    console.log("register password : " + password);

    userDB.createUser(uid, password, name, 0, function(err, results, fields){

        if(err){

            res.status(400).send('');

        } else {

            req.session.uid = uid;
            req.session.name = name;
            req.session.level = 0;

            res.send({
                "success": 1,
                "msg" : "Register Complete",
                "data": {
                    "id" : uid,
                    "name" : name
                }
            })

        }

    });
});

router.get('/register', function(req, res, next){

    var sendData = {};

    if(typeof req.session.uid !== 'undefined'){

        console.log(typeof req.session.uid);

        console.log(req.session.uid);

        res.redirect('/?alertMessage='+'이미 로그인되어있습니다.');

    }else{

        res.render('register', sendData);

    }
});

router.post('/login', function (req, res, next) {

    var uid = req.body.uid;
    var password = req.body.password;

    console.log("POST /users/login : ", uid, password);

    if(typeof req.session.uid !== 'undefined'){

        console.log(req.session.uid);

        res.send({
            "success": 0,
            "msg" : "이미 로그인되어있습니다."
        })

    }else{
        userDB.selectUserWhereId(uid, function(err, results, fields){
            if(err){

                res.send({
                    "success": 0,
                    "msg" : "DB ERROR"
                })

            } if(results.length === 0){

                res.send({
                    "success": 0,
                    "msg" : "아이디가 존재하지 않습니다."
                })

            } else if(results[0]['password'] === password){

                req.session.uid = uid;
                req.session.name = results[0]['name'];
                req.session.level = results[0]['level'];

                res.send({
                    "success": 1,
                    "msg" : "로그인 완료",
                    "data": {
                        "id" : uid,
                        "name" : results[0]['name']
                    }
                })

            }else{

                res.send({
                    "success": 0,
                    "msg" : "비밀번호가 틀렸습니다."
                })

            }

        });
    }
});

router.get('/edit', function(req, res, next){

    if(typeof req.session.uid === 'undefined'){

        res.redirect('/?alertMessage='+'로그인을 해주시기 바랍니다.');

    } else {

        res.render('editProfile');

    }
});

router.post('/edit', function(req, res, next){

    var password = req.body.password;
    var name = req.body.name;

    if(typeof req.session.uid === 'undefined'){

        res.send('?alertMessage=로그인이 필요합니다.');

    }else {

        userDB.updateUserWhereUid(password, name, req.session.uid, function(err, results, fields){

            if(err){

                res.status(400).send('');

            }else {

                req.session.name = name;
                res.send('정상적으로 변경되었습니다.');

            }

        })
    }
});

module.exports = router;