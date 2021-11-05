import process from 'node:process';
import mongoose from 'mongoose';

console.log('Final MONGODB_URI', process.env.MONGODB_URI);
export async function connect() {
	await mongoose.connect(process.env.MONGODB_URI);
	return mongoose.connection;
}

export async function disconnect() {
	return mongoose.disconnect();
}
