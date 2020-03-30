const redis = require('redis');

const { REDIS_HOST, REDIS_PORT } = process.env;

const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

const fib = index => {
    if(index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
};

sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)));
    console.log(message)
});

sub.subscribe('insert');