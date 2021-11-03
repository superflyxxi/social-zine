import process from 'node:process';
import {serverConfig, createServer} from '@superflyxxi/common';
import databaseClient from './db/index.js';

const app = createServer('Posts');
app.listen(serverConfig.port, function () {
	console.log('Started Posts (', serverConfig.version, ') listening on', serverConfig.port);
});
process.on('SIGTERM', function () {
	app.close(function () {
		databaseClient.close();
	});
});

export default app;
