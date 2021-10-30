import express from 'express';
import morgan from 'morgan';
import apiDocsRouter from './routers/api-docs/index.js';
import {server} from './config/index.js';
import {RouteNotFoundError, errorHandler} from '@superflyxxi/common';

const app = express();
app.use(express.json());
app.disable('x-powered-by');

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
	throw new RouteNotFoundError(req);
});
app.use(morgan('short'));
app.use(errorHandler);

// APIs
app.use('/api-docs', apiDocsRouter);

app.listen(server.port, () => {
	console.log('Started version', server.version, 'listening on', server.port);
});

export default app;
