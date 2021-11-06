import process from 'node:process';
import {MongoMemoryServer} from 'mongodb-memory-server';

let mongoServer;

async function beforeAll() {
	console.log('Starting up mongo');
	mongoServer = await MongoMemoryServer.create();
	process.env.MONGODB_URI = await mongoServer.getUri();
}

async function afterAll() {
	console.log('Shutting down mongo');
	await mongoServer.stop();
}

export const mochaHooks = {afterAll, beforeAll};
