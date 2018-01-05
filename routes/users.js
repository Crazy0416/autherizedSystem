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


router.get('/logout', function(req, res, next) {

    req.session.m_id = undefined;
    req.session.m_name = undefined;
    req.session.m_level = undefined;

    res.redirect('/?alertMessage=' + '로그아웃 되셨습니다.');

});

router.post('/register', function(req, res, next){

    var m_id = req.body.id;
    var m_password = req.body.password;
    var m_name = req.body.name;

    console.log("register password : " + m_password);

    mysql.query('INSERT INTO Members (mem_id, mem_password, mem_name, mem_level) VALUES (?,?,?,?)', [m_id, m_password, m_name, 0], function(err, results, fields){
        if(err){

            res.redirect('/?alertMessage=' + 'DB 오류');

        } else {

            console.log("POST /users/register : " + JSON.stringify(results));

            req.session.m_id = m_id;
            req.session.m_name = m_name;
            req.session.m_level = 0;

            res.send({
                ok: "ok!!"
            })

        }
    })
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

    if(typeof req.session.m_id !== 'undefined'){

        console.log(req.session.m_id);

        res.send('?alertMessage=이미 로그인되어있습니다.');

    }else{

        mysql.query("SELECT * FROM Members WHERE mem_id = ?", id, function(err, results, fields){

            console.log(results);

            if(err){

                res.send('?alertMessage=DB 에러');

            } if(results.length === 0){

                res.send('?alertMessage=ID가 존재하지 않습니다.');

            } else if(results[0]['mem_password'] === password){

                req.session.m_id = id;
                req.session.m_name = results[0]['mem_name'];
                req.session.m_level = results[0]['mem_level'];

                res.send('');

            }else{

                res.send('?alertMessage=비밀번호가 틀렸습니다.');

            }
        })
    }
});

router.get('/edit', function(req, res, next){

    if(typeof req.session.m_id === 'undefined'){

        res.redirect('/?alertMessage='+'로그인을 해주시기 바랍니다.');

    } else {

        res.render('editProfile');

    }
});

router.post('/edit', function(req, res, next){

    var m_password = req.body.password;
    var m_name = req.body.name;

    if(typeof req.session.m_id === 'undefined'){

        res.send('?alertMessage=로그인이 필요합니다.');

    }else {

        mysql.query('UPDATE Members SET mem_password=?, mem_name=? WHERE mem_id=?', [m_password, m_name, req.session.m_id], function(err, results, fields){

            if(err){

                res.send('?alertMessage=DB 오류');

            }

            req.session.m_name = m_name;
            console.log('POST /users/edit : '+ JSON.stringify(results));

            res.send('');

        })
    }
});

module.exports = router;