const crypto = require("crypto");

// some potentially high-loaded sync execution process
const gen = (length) => crypto.randomBytes(length).toString("hex")

process.on("message", (msg) => {
  process.send({
    value: gen(parseInt(msg)),
    type: msg
  })
});


