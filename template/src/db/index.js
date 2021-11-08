import process from 'node:process';
import mongoose from 'mongoose';

export async function connect() {
	console.log('Using', process.env.MONGODB_URI);
	await mongoose.connect(process.env.MONGODB_URI);
	return mongoose.connection;
}

export async function disconnect() {
	return mongoose.disconnect();
}
