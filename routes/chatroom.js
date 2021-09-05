var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
console.log("[Router] chatroom" );	

    res.render('chatroom');  

});

module.exports = router;
