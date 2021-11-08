import {serverConfig, createServer} from '@superflyxxi/common';
import {connect as connectDatabase} from './db/index.js';

await connectDatabase();

const app = createServer('Template', serverConfig.version, function (server) {
	// Add your api to server here
	console.log(server);
});
app.listen(serverConfig.port, function () {
	console.log('Started serviceNameHere (', serverConfig.version, ') listening on', serverConfig.port);
});
export default app;
