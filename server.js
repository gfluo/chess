'use strict'

const websocketSever = require('ws').Server;
const config = require('./config').server;

const http = config.https ? require('https') : require('http');   ///选择https or http

/*
* 现阶段不需要https, 省略关于搭建https代码
*/

const port = parseInt(process.env.PORT || config.port);       ///如果当前未指定port调用配置文件中port
const httpServer = http.createServer((req, res) => {
    res.writeHead(404,{
        "content-type": "text/plain"
    });
    res.end();
}).listen(port);

httpServer.on('error', onError);

let wss = new websocketSever({
    server: httpServer
});

wss.on('connection', (socket) => {
    
});

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
      }
    
      var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    
      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
}