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

    console.log(req.session.m_id, req.session.m_level);
    var sendData = {};

    if(req.session.m_id === 'xxxx' && req.session.m_level === 1){

        userDB.all(function(err, results, fields){

            if(err){

                res.redirect('?alertMessage='+ 'DB 오류');

            } else {

                sendData.memberArr = results;

                res.render('admin', sendData);

            }

        });
    }else{

        res.redirect('?alertMessage='+ '관리자가 아님');

    }
});

router.post('/edit', function(req, res, next){

    var m_id = req.body.id;
    var m_name = req.body.name;
    console.log("이름 : " + m_name + "\n아이디: " + m_id);

    userDB.updateName(m_name, m_id, function(err, results, fields){

        if(err){

            console.log("ERR DB UPDATE : "  + err);
            res.status(400).send('변경 실패..');

        } else {

            res.send('변경 성공!!');

        }

    });

});



module.exports = router;