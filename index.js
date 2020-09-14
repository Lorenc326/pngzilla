const httpBase = require('http');
const url = require('url');
const { fork } = require('child_process');
const { EventEmitter } = require('events');

const cryptoEvent = new EventEmitter();
const cryptoProcess = fork('crypto.js');

cryptoProcess.on('message', (msg) => cryptoEvent.emit(msg.type, msg.value))

const initApp = (http) => {
  const endpoints = []
  const server = http.createServer((req, res) => {
    let found = false
    endpoints.forEach(({ endpoint, cb }) => {
      const [method, url] = endpoint.split(' ')
      if (method.toUpperCase() == req.method && url === req.url.split('?')[0]) {
        found = true
        cb(req, res)
      }
    })
    if (!found) {
      res.writeHead(404);
      res.end()
    }
  })

  return {
    listen: (...args) => server.listen(...args),
    route: (endpoint, cb) => endpoints.push({ endpoint, cb })
  }
}

const app = initApp(httpBase)

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

app.listen(3000, function(){
  console.log("server start at port 3000");
 });