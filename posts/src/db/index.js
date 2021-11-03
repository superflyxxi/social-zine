import {MongoClient} from 'mongodb';
import process from 'node:process';

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
await client.db("social-zine");
export default client;
