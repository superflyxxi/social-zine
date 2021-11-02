import swaggerUi from 'swagger-ui-express';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';

import {server} from '../config/index.js';

const router = express.Router();

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

router.get('/json', (req, res) => res.send(openapispec));
router.use('/', swaggerUi.serve, swaggerUi.setup(openapispec));

export default router;
