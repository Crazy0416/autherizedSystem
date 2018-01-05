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

    })

    mysql.query('INSERT INTO Members (uid, password, name, level) VALUES (?,?,?,?)', [uid, password, name, 0], function(err, results, fields){
        if(err){

            res.status(400).send('');

        } else {

            console.log("POST /users/register : " + JSON.stringify(results));

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
    })
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

        res.send('?alertMessage=이미 로그인되어있습니다.');

    }else{

        mysql.query("SELECT * FROM Members WHERE uid = ?", uid, function(err, results, fields){

            console.log(results);

            if(err){

                res.send('?alertMessage=DB 에러');

            } if(results.length === 0){

                res.send('?alertMessage=ID가 존재하지 않습니다.');

            } else if(results[0]['mem_password'] === password){

                req.session.uid = id;
                req.session.name = results[0]['mem_name'];
                req.session.level = results[0]['mem_level'];

                res.send('');

            }else{

                res.send('?alertMessage=비밀번호가 틀렸습니다.');

            }
        })
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

        mysql.query('UPDATE Members SET password=?, name=? WHERE uid=?', [password, name, req.session.uid], function(err, results, fields){

            if(err){

                res.send('?alertMessage=DB 오류');

            }

            req.session.name = name;
            console.log('POST /users/edit : '+ JSON.stringify(results));

            res.send('');

        })
    }
});

module.exports = router;