import express from 'express';
import {createServer} from '@superflyxxi/common';
import {server} from './config/index.js';

const app = createServer('Template', server.version, function(server) {
// add your api to server here
});
	app.listen(server.port, () => {
		console.log('Started', title, '(', server.version, ') listening on', server.port);
	});
export default app;
