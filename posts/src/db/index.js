import process from 'node:process';
import {MongoClient} from 'mongodb';

// URI like mongodb://user:password@mongo:27017/
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
await client.db('social-zine');
export default client;
