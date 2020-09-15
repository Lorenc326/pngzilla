const redis = require('redis');

const host = process.env.REDIS_URL || 'redis';
const port = process.env.REDIS_PORT || 6379;

module.exports = redis.createClient(port, host)