var express = require('express');
var router = express.Router();
var moment = require('moment');

router.use(function(req, res, next){
    console.log('/users : ' + moment().format());
    next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
    var sendData = {};
    if(req.query.alertMessage){
        sendData.alertMessage = req.query.alertMessage;
    }
    if(req.session.m_id){
        sendData.m_id = req.session.m_id;
        sendData.m_name = req.session.m_name;
    }
    res.render('index', sendData);
});

module.exports = router;
