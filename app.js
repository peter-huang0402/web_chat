var bodyparser = require('body-parser');  
var express = require('express');
 
var conf = require('./conf');
var functions = require('./functions');
var users = require('./routes/users');
 
var app = express();

app.get('/', function(req,res){	
	console.log("Go to "+__dirname+'/login.html'  );	
        res.sendFile(__dirname+'/login.html');
});

/*
app.get('/go', function(req,res){	
	console.log("Go to "+__dirname+'/chat.html'  );	
        res.sendFile(__dirname+'/chat.html');
});
*/
 
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
 
app.use(functions.passwdCrypto);
app.use('/users', users);
 
app.listen(conf.port, function () {
    console.log('Web Chat Room on port=' + conf.port );
});



var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketsArray = new Array();

io.on('connection', function(socket){

	socketsArray.push(socket);
	socket.on('disconnect',function(){
		socketsArray.pop(socket);
	});

	socket.on('sendMsg', function(msg){
		console.log('message: ' + msg);
		for (i=0;i<socketsArray.length;i++)
		{
			socketsArray[i].emit('data', msg );
		}
	});


	socket.on('sendMsg2', function(msg){
		console.log('message2: ' + msg);
		for (i=0;i<socketsArray.length;i++)
		{
			socketsArray[i].emit('data2', msg );
		}
	});

});

http.listen( (conf.port +10), function(){
	console.log("Socket listening on port="+ (conf.port +10) );
});
