import process from 'node:process';
import {v4 as uuidv4} from 'uuid';

export {errorHandler, RootError}

function errrorHandler(error, req, res, next) {
	console.log('error encountered', error);
	if (res.headersSent) {
		return next(error);
	}

	const message = {
		type: error.type ?? '/errors/SYSTEM_ERROR',
		title: error.title ?? 'System Error',
		status: error.status ?? 500,
		detail: error.detail ?? error.message ?? 'An unknown system error has occurred.',
		instance: uuidv4(),
		stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
	};
	res.status(message.status).send(message);
}

class RootError extends Error {
	constructor(type, title, status, detail) {
		super(detail);
		this.name = 'RootError';
		this.type = type;
		this.title = title;
		this.status = status;
		this.detail = detail;
	}
}
