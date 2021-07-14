const http = require('http');
const express = require('./express')
const Server = http.createServer(express)
const port = process.env.PORT | 3000
express.set("port",port)


handleError = (error) => {
  throw error;
}

handleListen = () => {
  console.log('Listening to port : '+ port + '....')
}

Server.on('error',handleError);
Server.on('listening',handleListen);
Server.listen(port);



