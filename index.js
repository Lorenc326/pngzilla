const httpBase = require('http');

const initApp = (http) => {
  const endpoints = []
  const server = http.createServer((req, res) => {
    let found = false
    endpoints.forEach(({ endpoint, cb }) => {
      const [method, url] = endpoint.split(' ')
      if (method.toUpperCase() == req.method && url === req.url) {
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
  res.writeHead(200, {'Content-Type': 'text'});
  const { exec } = require('child_process');
  // ...
  res.end('hello');
})

app.listen(3000, function(){
  console.log("server start at port 3000"); //the server object listens on port 3000
 });