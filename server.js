/**
Before running:
> npm install ws
Then:
> node server.js
> open http://localhost:8080 in the browser
*/

const http = require('http');
const fs = require('fs');
const ws = new require('ws');
const port = 8080;

const wss = new ws.Server({ noServer: true });
http.createServer(accept).listen(port);
let log = console.log;
log(`WS connected at port: ${port}`);

const clients = new Set();

function accept(req, res) {
  // aquí solo manejamos conexiones websocket
  switch (req.url) {
    case '/ws':
      if (req.headers.upgrade && req.headers.upgrade.toLowerCase() == 'websocket' &&
        // can be Connection: keep-alive, Upgrade
        req.headers.connection.match(/\bupgrade\b/i)) {
        wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
      }
      break;
    case '/':  // index.html
      fs.createReadStream('./index.html').pipe(res);
      break;
    case '/api':
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
      let noms = [];
      clients.forEach(function (value) {
        //console.log(JSON.stringify(value.nom))
        noms.push(value.nom);
      })
      const responseBody = { at1: "Hola", at2: "adios", data: noms };
      res.write(JSON.stringify(responseBody));
      res.end();
      break;
    default:    // page not found
      res.writeHead(404);
      res.end();
  }
}

function onSocketConnect(ws) {
  clients.add(ws);
  log(`new connection`);

  ws.on('message', function (message, isBinary) {
    let obj = JSON.parse(message);
    let txt = '';
    let array = [];
    let json = '';
    switch (obj.tipus) {
      case "login":
        ws.nom = obj.nickname;
        log("Connection from " + ws.nom + " remote Address:" + ws._socket.remoteAddress);
        //log(`message received: ${message}`);
        for (let client of clients) {
          //client.send({ text: 'Connectat : Nickname: ' + obj.nickname + ', longitud:' + obj.longitut + ', latitud: ' + obj.latitut, coordl: obj.longitut, coordlat: obj.latitut });
          txt = 'Connectat : Nickname: ' + obj.nickname + ', longitut:' + obj.longitut + ', latitut: ' + obj.latitut;
          array = ['login', txt, obj.longitut, obj.latitut];
          json = JSON.stringify(array); 
          client.send(json);
        }
        break;
      case "logout":
        ws.nom = obj.nickname;
        log("Disconnection from " + ws.nom + " remote Address:" + ws._socket.remoteAddress);
        //log(`message received: ${message}`);
        for (let client of clients) {
          txt = 'Desconnectat: Nickname: ' + obj.nickname;
          array = ['logout', txt];
          json = JSON.stringify(array); 
          client.send(json);
        }
        break;
      case "data":
        log("Message send from " + ws.nom + " remote Address:" + ws._socket.remoteAddress);
        //log(`message received: ${message}`);
        for (let client of clients) {
          txt = obj.nickname + ': ' + obj.text;
          array = ['data', txt];
          json = JSON.stringify(array); 
          client.send(json);
        }
        break;
      default:
        log("Tipus erroni:" + obj.tipus);
    }
  });

  ws.on('close', function () {
    log(`connection closed`);
    clients.delete(ws);
  });
}