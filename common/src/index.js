import process from 'node:process';
import {v4 as uuidv4} from 'uuid';

function errorHandler(error, req, res, next) {
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

class NotFoundError extends RootError {
	constructor(detail) {
		super('/errors/NOT_FOUND', 'Not Found', 404, detail);
	}
}

class RouteNotFoundError extends NotFoundError {
	constructor(req) {
		super(`${req.method} ${req.path} not a valid API.`);
	}
}

export default {errorHandler, RootError, NotFoundError, RouteNotFoundError};
