var express = require('express');
var router = express.Router();
var db_config = require('../config/db_config.json')
var moment = require('moment');
var connection = require('mysql');

var mysql = connection.createConnection(db_config);

router.use(function(req, res, next){
    console.log('/admin : ' + moment().format());
    next();
});

router.get('/', function(req, res, next){
    var sendData = {};
    console.log(req.session.m_id, req.session.m_level)
    if(req.session.m_id === 'xxxx' && req.session.m_level === 1){
        mysql.query('SELECT * FROM Members', function (err, results, fields) {
            if(err){
                res.redirect('?alertMessage='+ 'DB 오류');
            }else {
                console.log('GET /admin : ' + JSON.stringify(results));
                sendData.memberArr = results;
                res.render('admin', sendData);
            }
        })
    }else{
        res.redirect('?alertMessage='+ '관리자가 아님');
    }
});

router.post('/edit', function(req, res, next){
    var m_id = req.body.id;
    var m_name = req.body.name;
    console.log("이름 : " + m_name + "\n아이디: " + m_id);
    mysql.query('UPDATE Members SET mem_name=? WHERE mem_id=?', [m_name, m_id], function(err, results, fields){
        if(err){
            res.send('변경 실패..');
        }
        console.log('POST /admin/edit : '+ JSON.stringify(results));
        console.log('POST /admin/edit : '+ JSON.stringify(fields));
        res.send('변경 성공!!');
    })
});



module.exports = router;