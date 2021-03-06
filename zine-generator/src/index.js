import {serverConfig, createServer} from '@superflyxxi/common';

const app = createServer('Zines');
app.listen(serverConfig.port, function () {
	console.log('Started Zines (', serverConfig.version, ') listening on', serverConfig.port);
});
export default app;
