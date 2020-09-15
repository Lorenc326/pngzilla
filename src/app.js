module.exports = {
  initApp: http => {
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
}