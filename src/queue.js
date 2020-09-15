const redis = require('./redis')

const add = (key, value, cb) => redis.set(key, value, cb)

const watch = (tick, task) => {
  // get all keys, might find faster analog heh
  redis.keys('*', (_, res) => {
    // if queue is not empty - process,
    // if is empty - recheck in *tick* ms
    if (res.length) {
      const key = res[0]
      console.log(`queue has ${res.length} records`);
      console.log(`processing ${key}`);
      // process first entry with callback
      redis.get(key, async (_, value) => {
        await task(key, value);
        // remove entry from queue once processed
        redis.del(key, () => {
          console.log(`processed and removed ${key}`);
          watch(tick, task);
        })
      })
    } else {
      console.log(`queue is empty, retry in ${tick}ms`);
      setTimeout(() => watch(tick, task), tick)
    }
  })
}

module.exports = {
  add,
  watch
}