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
    res.render('index', sendData);
});

module.exports = router;
