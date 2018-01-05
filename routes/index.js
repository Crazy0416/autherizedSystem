var express = require('express');
var router = express.Router();
var moment = require('moment');

router.use(function(req, res, next){

    console.log('/users : ' + moment().format());

    next();

});

/* GET home page. */
router.get('/', function(req, res, next) {

    var sendData = {};

    if(req.query.alertMessage){

        sendData.alertMessage = req.query.alertMessage;

    }
    if(typeof req.session.m_id !== 'undefined' && typeof req.session.m_level !== 'undefined'){

        sendData.m_id = req.session.m_id;
        sendData.m_name = req.session.m_name;

    }
    if(req.session.m_id && req.session.m_level !== 1){       // 관리자가 아닌 유저가 로그인 되어 있는 경우

        res.render('userInfo', sendData);

    }else if(req.session.m_id && req.session.m_level === 1){        // 관리자로 로그인 되어 있는 경우

        res.render('adminInfo', sendData);

    } else {                                      // 로그인 되어있지 않는 경우

        res.render('login', sendData);

    }
});

module.exports = router;
