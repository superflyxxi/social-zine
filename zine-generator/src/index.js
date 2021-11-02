import express from 'express';
import morgan from 'morgan';
import {serverConfig, getApiDocsRouter, RouteNotFoundError, errorHandler} from '@superflyxxi/common';

const app = express();
app.use(express.json());
app.disable('x-powered-by');
app.use(morgan('short'));

// APIs
app.use('/api-docs', getApiDocsRouter('Zine Generator', serverConfig.version));

// Errors
app.use((req, res, next) => {
	next(new RouteNotFoundError(req));
});
app.use(errorHandler);
app.listen(serverConfig.port, () => {
	console.log('Started version', serverConfig.version, 'listening on', serverConfig.port);
});

export default app;
