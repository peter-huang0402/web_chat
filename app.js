var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');



var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


var login = require('./routes/login');
var users = require('./routes/users');
var chatroom = require('./routes/chatroom');

app.use('/', login);
app.use('/chatroom', chatroom);

//------------------------------

var conf = require('./routes/lib/conf');
var functions = require('./routes/lib/functions'); 
app.use(functions.passwdCrypto);
app.use('/users', users);
//---------------------------------




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


/////   web socket
var clientsArray = new Array();


/*
void sendUser( wsSocket ){
    var str="";
    for (i=0;i<clientsArray.length;i++)
    {
         if (i == 0){
            str = clientsArray[i].name ;
         }else{
            str = str+","+ clientsArray[i].name ;
         }
    }
    wsSocket.send(  JSON.stringify( {op:"users",  payload:str  } ) );  
} 
*/



const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('open', function open() {
  console.log('WebSocket connected');
});

server.on('close', function close() {
   console.log('WebSocket disconnected');
});

server.on('connection', function connection(ws, req) {
  console.log("WebSocket url="+ req.url +" , user="+req.url);
  var idx = req.url.lastIndexOf("="); 
  var newUser =  req.url.substring(idx+1,req.url.length ) ;
   
  const ip = req.connection.remoteAddress;
  const port = req.connection.remotePort;
  const clientName = ip + port;

  console.log('Connected by id=%s ip=%s port=%s , user=', clientName , ip, port , newUser );

  var clientObj = {};
  clientObj.id= clientName ;
  clientObj.name = newUser;
  clientsArray.push(clientObj);


   server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
          // client.send(  JSON.stringify( {op:"add",  payload:newUser  } ) );  
         // sendUser(client);      
            var str="";
	    for (i=0;i<clientsArray.length;i++)
	    {
		 if (i == 0){
		    str = clientsArray[i].name ;
		 }else{
		    str = str+","+ clientsArray[i].name ;
		 }
	    }
	    client.send(  JSON.stringify( {op:"users",  payload:str  } ) );  
      }
    });



  ws.on('message', function incoming(message) {
    console.log('received: %s from %s', message, clientName);
    
    // send to all clients
    server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        //client.send( clientName + " -> " + message);
         var obj = JSON.parse(message);      

	 client.send( JSON.stringify( {op:"msg", payload:obj.payload, from:obj.from } )  );
      }
    });
  });

  ws.on('close', function closeFunc(code, desc ) {
     // console.log('req  address=%s  port=%s', req.connection.remoteAddress , req.connection.remotePort ); 
     // console.log('#### [closed] clientsArray.length=%s ,code=%s ,desc=%s ,ip=%s ,port=%s ,user=%s', clientsArray.length, code, desc, ip, port , newUser );
     
     for (i=0;i<clientsArray.length;i++)
     {          
         console.log('[close] clientsArray[%s] ,id=%s ,user=%s ', i, clientsArray[i].id , clientsArray[i].name );
         if ( clientsArray[i].id == (clientName) ){
             //console.log('#### [close] user.pop() id=%s , user=%s ', clientName , clientsArray[i].name );
	     clientsArray.splice(i , 1);
         }   
      }

      server.clients.forEach(function each(client) {
      	if (client.readyState === WebSocket.OPEN) {
            // client.send(  JSON.stringify( {op:"add",  payload:newUser  } ) );  
            //sendUser(client);      
            var str="";
	    for (i=0;i<clientsArray.length;i++)
	    {
                console.log('[close] new clientsArray[%s] ,id=%s ,user=%s ', i, clientsArray[i].id , clientsArray[i].name );
		 if (i == 0){
		    str = clientsArray[i].name ;
		 }else{
		    str = str+","+ clientsArray[i].name ;
		 }
	    }
	    client.send(  JSON.stringify( {op:"users",  payload:str  } ) );  
      	}
      });

  });


});


