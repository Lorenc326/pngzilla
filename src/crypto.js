const crypto = require("crypto");

// some high-loaded sync execution process
const gen = (length) => {
  for (let i = 0; i <= 100; i++) {
    crypto.randomBytes(length).toString("hex")
  }
  return crypto.randomBytes(length).toString("hex")
}

process.on("message", ({ key, value }) => {
  console.log(key, value)
  process.send({
    result: gen(parseInt(value)),
    key
  })
});
