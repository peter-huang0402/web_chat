var express = require('express');
var users = require('../models/users');
 
var router = express.Router();
 

router.route('/')
    .get(function (req, res) {
            console.log('router [get] queryUsers() ');
            users.queryUsers(req, function (err, results, fields) {

            if (err) {
                res.status(500).send( { err_message: err.message } );
                return console.error(err);
            }
        
            if (!results.length) {
                res.sendStatus(410);
                return;
            }
 
            res.json(results);
        });
    })

    .post(function (req, res) {        
            console.log('router [post] addUser()');
            users.addUser(req, function (err, results, fields) {
            
            if (err) {
                //res.sendStatus(500);
                console.error("err= " +err); 
                
                //res.status(500).send( { error: err , message: err.message } );
                res.status(500).send( { err_message: err.message } );
                return 
            }
            
            res.status(201).json(results.insertId);
        });
    });



router.route('/login')
    .post(function (req, res) {        
            console.log('router [post] queryUserByNamePassword()');
            users.queryUserByNamePassword( req, function (err, results, fields) {
            //console.log('login 2 length='+ results.length );

            if (err) {
                res.status(500).send( { err_message: err.message } );
                return console.error(err);
            }
 
             if (results == ''){                   
                  console.log('[ERR] login failed, results.length='+ results.length );
                  res.locals.error ="wrong name and password.";
                  //res.render('\');
                  res.status(500).json( { err_message: res.locals.error });
                  return ;
             }
 
             console.log('login result= '+ results[0].id+" ,name="+results[0].username+" ,password="+results[0].password+" ,email="+results[0].email );           
            res.status(201).json(results);
        });
    });


 

router.route('/:id')    
    .get(function (req, res) {
           console.log('router [get] queryUserByID()');
           users.queryUserByID(req, function (err, results, fields) {
            
            if (err) {
                res.status(500).send( { err_message: err.message } );
                return console.error(err);
            }
 
            if (!results.length) {
                res.sendStatus(410);
                return;
            }
 
            res.json(results);
        });
    })  
    .delete(function (req, res) {        
             console.log('router [delete] deleteUserByID()');
             users.deleteUserByID(req, function (err, results, fields) {

            if (err) {
                res.status(500).send( { err_message: err.message } );
                return console.error(err);
            }
 
           
            // SQL DELETE successfully,  results.affectedRows => return 1， oetherwise return 0.
            if (!results.affectedRows) {
                res.sendStatus(410);
                return;
            }
 
            // return no any content.
            res.sendStatus(204);
        });
    })
    
    .patch(function (req, res) {
            console.log('router [patch] updateByID()');
            users.updateByID(req, function (err, results, fields) {

            if (err) {
                res.status(500).send( { err_message: err.message } );
                return console.error(err);
            }
             
            if (!results.affectedRows) {
                res.sendStatus(410);
                return;
            }             
            req.body.id = req.params.id;
            res.json([req.body]);
        });
    });


 
module.exports = router;
