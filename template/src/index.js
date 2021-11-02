import {serverConfig, createServer} from '@superflyxxi/common';

const app = createServer('Template', serverConfig.version, function (server) {
	// Add your api to server here
	console.log(server);
});
app.listen(serverConfig.port, function () {
	console.log('Started serviceNameHere (', serverConfig.version, ') listening on', serverConfig.port);
});
export default app;
