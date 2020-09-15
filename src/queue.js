const redis = require('./redis')

const add = (key, value, cb) => redis.set(key, value, cb)

const watch = (tick, task) => {
  // get all keys, might has faster analog heh
  redis.keys('*', (_, res) => {
    // if queue is not empty - process,
    // is empty - recheck in *tick* ms
    if (res.length) {
      const key = res[0]
      // process first entry with callback
      redis.get(key, async (_, value) => {
        await task(key, value);
        // remove entry from queue once processed
        redis.del(key, () => {
          watch(tick, task);
        })
      })
    } else {
      setTimeout(() => watch(tick, task), tick)
    }
  })
}

module.exports = {
  add,
  watch
}