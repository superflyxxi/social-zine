import swaggerUi from 'swagger-ui-express';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';

import {server} from '../config/index.js';

const apiDocs = express.Router();

const openapispec = swaggerJsdoc({
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Template',
			version: server.version,
		},
	},
	apis: ['./src/routers/**/*.js'],
});

apiDocs.get('/json', (req, res) => res.send(openapispec));
apiDocs.use('/', swaggerUi.serve, swaggerUi.setup(openapispec));

export default apiDocs;
