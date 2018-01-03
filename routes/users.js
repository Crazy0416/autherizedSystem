var express = require('express');
var router = express.Router();
var db_config = require('../config/db_config.json')
var moment = require('moment');
var connection = require('mysql');

var mysql = connection.createConnection(db_config);

router.use(function(req, res, next){
    console.log('/users : ' + moment().format());
    next();
});

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next){
    var m_id = req.body.id;
    var m_password = req.body.password;
    var m_
});

router.get('/register', function(req, res, next){
    var sendData = {};
    if(typeof req.session.m_id !== 'undefined'){
        console.log(typeof req.session.m_id);
        console.log(req.session.m_id);
        res.redirect('/?alertMessage='+'이미 로그인되어있습니다.');
    }else{
        res.render('register', sendData);
    }
});

router.post('/login', function (req, res, next) {
    var id = req.body.id;
    var password = req.body.password;

    console.log("POST /users/login : ", id, password);

    if(req.session.m_id !== 'undefined'){
        res.redirect('/?alertMessage='+'이미 로그인되어있습니다.');
    }else{
        mysql.query("SELECT * FROM Members WHERE id = ?", id, function(err, result, fields){
            if(err){
                res.redirect('/?alertMessage'+'DB 에러');
            } if(result.length === 0){
                res.redirect('/?alertMessage'+'ID가 존재하지 않습니다.');
            }
            if(result[0]['password'] === password){
                req.session.m_id = id;
                req.session.m_name = result[0]['mem_name'];
                res.redirect('/');
            }else{
                res.redirect('/?alertMessage'+'비밀번호가 틀렸습니다.');
            }
        })
    }
})

module.exports = router;