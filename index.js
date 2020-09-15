const http = require('http');
const url = require('url');
const { fork } = require('child_process');
const { EventEmitter } = require('events');

const { initApp } = require('src/init-app');

const cryptoEvent = new EventEmitter();
const cryptoProcess = fork('src/crypto.js');

cryptoProcess.on('message', (msg) => cryptoEvent.emit(msg.type, msg.value))

const redis = require('redis');

var host = process.env.REDIS_URL || 'redis';
var client = redis.createClient(6379, host);

const app = initApp(http)

app.route('GET /health', (req, res) => {
  res.end('true');
})

app.route('GET /random-hex', (req, res) => {
  const query = url.parse(req.url,true).query;
  if (query.length) {
    res.writeHead(200, {'Content-Type': 'text'});
    cryptoProcess.send(query.length)
    cryptoEvent.once(query.length, (result) => res.end(result))
  } else {
    res.writeHead(400);
    res.end();
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server start at port ${port}`);
 });