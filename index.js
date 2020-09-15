const http = require('http');
const url = require('url');
const { fork } = require('child_process');
const { EventEmitter } = require('events');
const { initApp } = require('./src/app');
const redis = require('./src/redis');
const queue = require('./src/queue');

const app = initApp(http)

app.route('GET /health', (req, res) => {
  res.end('true');
})

const cryptoProcess = fork('src/crypto.js');
const cryptoEvent = new EventEmitter();
cryptoProcess.on('message', (msg) => {
  cryptoEvent.emit(msg.key, msg.result)
})

app.route('POST /heavy-calc', (req, res) => {
  const value = url.parse(req.url,true).query.length;
  if (value) {
    res.writeHead(204);
    const key = Math.random().toString(36)
    queue.add(key, value, () => {
      res.end()
    })
  } else {
    res.writeHead(400);
    res.end();
  }
})

const port = process.env.PORT || 3000;
const queueTick = 500

redis.on('connect', () => {
  app.listen(port, () => {
    console.log(`server start at port ${port}`);

    queue.watch(queueTick, (key, value) => {
      cryptoProcess.send({ key, value })
      return new Promise((resolve) => {
        cryptoEvent.once(key, (result) => {
          console.log(`${key} is executed by child-process`)
          resolve(result)
        })
      })
    })
  });
})