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
    if(typeof req.session.uid !== 'undefined' && typeof req.session.level !== 'undefined'){

        sendData.uid = req.session.uid;
        sendData.name = req.session.name;

    }
    if(req.session.uid && req.session.level !== 1){       // 관리자가 아닌 유저가 로그인 되어 있는 경우

        res.render('userInfo', sendData);

    }else if(req.session.uid && req.session.level === 1){        // 관리자로 로그인 되어 있는 경우

        res.render('adminInfo', sendData);

    } else {                                      // 로그인 되어있지 않는 경우

        res.render('login', sendData);

    }
});

module.exports = router;
