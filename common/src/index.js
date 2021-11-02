import process from 'node:process';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import validatejs from 'validate.js';
import {v4 as uuidv4} from 'uuid';

export function errorHandler(error, req, res, next) {
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

export class RootError extends Error {
	constructor(type, title, status, detail) {
		super(detail);
		this.name = 'RootError';
		this.type = type;
		this.title = title;
		this.status = status;
		this.detail = detail;
	}
}

export class NotFoundError extends RootError {
	constructor(detail) {
		super('/errors/NOT_FOUND', 'Not Found', 404, detail);
	}
}

export class RouteNotFoundError extends NotFoundError {
	constructor(req) {
		super(`${req.method} ${req.path} not a valid API.`);
	}
}

export class ValidationError extends RootError {
	constructor(result) {
		super('/errors/VALIDATION_ERROR', 'Validation Error', 400, result);
	}
}

export function validate(object, constraints) {
	const result = validatejs(object, constraints);
	if (result) {
		throw new ValidationError(result);
	}
}

export function getVersionObject(string) {
	if (string) {
		const splt = string.split('.');
		return {
			major: splt[0] ? Number.parseInt(splt[0], 10) : undefined,
			minor: splt[1] ? Number.parseInt(splt[1], 10) : undefined,
			patch: splt[2] ? Number.parseInt(splt[2], 10) : undefined,
		};
	}

	return {};
}

export function getApiDocsRouter(title, version) {
	const apiDocs = express.Router();

	const openapispec = swaggerJsdoc({
		swaggerDefinition: {
			openapi: '3.0.0',
			info: {title, version},
		},
		apis: ['./src/routers/**/*.js'],
	});

	apiDocs.get('/json', (req, res) => res.send(openapispec));
	apiDocs.use('/', swaggerUi.serve, swaggerUi.setup(openapispec));
	return apiDocs;
}
