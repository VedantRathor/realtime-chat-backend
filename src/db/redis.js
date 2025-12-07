require('dotenv').config();
const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => {
    console.log('Some error in connecting redis', err);
});

async function connectRedis() {
    try {
        await redisClient.connect();
        console.log('Redis connected');
    } catch (err) {
        console.error("Error in connecting redis", err);
    }
}

connectRedis();

module.exports = redisClient;
