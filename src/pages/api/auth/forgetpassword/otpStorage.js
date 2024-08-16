// let otpStorage = {};

// export default otpStorage;
import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URL, // Ensure REDIS_URL is set in your environment variables
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export default client;
