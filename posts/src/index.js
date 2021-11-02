import {serverConfig, createServer} from '@superflyxxi/common';

const app = createServer('Posts');
app.listen(serverConfig.port, function () {
	console.log('Started Posts (', serverConfig.version, ') listening on', serverConfig.port);
});
export default app;
