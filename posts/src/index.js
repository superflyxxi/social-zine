import {serverConfig, createServer} from '@superflyxxi/common';
import {connect as databaseConnect} from './db/index.js';
import route from './routes/posts.js';

await databaseConnect();

const app = createServer('Posts', function (server) {
	server.use('/v1/posts', route);
});
app.listen(serverConfig.port, function () {
	console.log('Started Posts (', serverConfig.version, ') listening on', serverConfig.port);
});

export default app;
