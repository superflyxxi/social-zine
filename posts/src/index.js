import {serverConfig, createServer} from '@superflyxxi/common';
import {connect as databaseConnect} from './db/index.js';

await databaseConnect();

const app = createServer('Posts');
app.listen(serverConfig.port, function () {
	console.log('Started Posts (', serverConfig.version, ') listening on', serverConfig.port);
});

export default app;
