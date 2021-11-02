import express from 'express';
import morgan from 'morgan';
import {RouteNotFoundError, errorHandler} from '@superflyxxi/common';
import apiDocsRouter from './routers/api-docs.js';
import {server} from './config/index.js';

const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.use(morgan('short'));
app.use(errorHandler);

// APIs
app.use('/api-docs', apiDocsRouter);

app.use((req, res, next) => {
	next(new RouteNotFoundError(req));
});
app.listen(server.port, () => {
	console.log('Started version', server.version, 'listening on', server.port);
});

export default app;
