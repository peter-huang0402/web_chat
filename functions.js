var crypto = require('crypto'); 
var conf = require('./conf');
 
module.exports = {
    
    passwdCrypto: function (req, res, next) {
        if (req.body.password) {
            req.body.password = crypto.createHash('md5')
                                .update(req.body.password + conf.salt)
                                .digest('hex');
        }
 
        next();
    }
};
