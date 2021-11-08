import process from 'node:process';
import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

async function afterEach() {
	for (const i in mongoose.connection.collections) {
		mongoose.connection.collections[i].deleteMany(() => {});
	}
}

async function beforeAll() {
	console.log('Starting up mongo');
	mongoServer = await MongoMemoryServer.create();
	process.env.MONGODB_URI = await mongoServer.getUri();
}

async function afterAll() {
	console.log('Shutting down mongo');
	await mongoServer.stop();
}

export const mochaHooks = {afterAll, beforeAll, afterEach};
