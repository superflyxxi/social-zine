import process from 'node:process';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import validatejs from 'validate.js';
import {v4 as uuidv4} from 'uuid';

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           format: uri
 *           description: The type of error that has occurred.
 *           example: '/errors/SYSTEM_ERROR'
 *         title:
 *           type: string
 *           description: A human readable title for the error.
 *           example: System Error
 *         status:
 *           type: integer
 *           description: The HTTP response status of this error.
 *           example: 500
 *         detail:
 *           type: string
 *           description: Some details about the error.
 *           example: An unknown system error has occurred.
 *         instance:
 *           type: string
 *           format: uuid
 *           description: A unique identifier of this instance of the error.
 *           example: 2c046e7d-8d71-4f4e-9d79-aef50777a9b3
 */
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

function getApiDocsRouter(title, version) {
	const apiDocs = express.Router();

	const openapispec = swaggerJsdoc({
		swaggerDefinition: {
			openapi: '3.0.0',
			info: {title, version},
		},
		apis: ['./src/routers/**/*.js', '../common/src/index.js'],
	});

	apiDocs.get('/json', (req, res) => res.send(openapispec));
	apiDocs.use('/', swaggerUi.serve, swaggerUi.setup(openapispec));
	return apiDocs;
}

export function createServer(port, title, version, function_) {
	const app = express();
	app.use(express.json());
	app.disable('x-powered-by');
	app.use(morgan('short'));

	// APIs Docs
	app.use('/api-docs', getApiDocsRouter(title, version));

	if (function_) {
		function_(app);
	}

	// Errors
	app.use((req, res, next) => {
		next(new RouteNotFoundError(req));
	});
	app.use(errorHandler);
	return app;
}
