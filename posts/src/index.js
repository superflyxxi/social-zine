import {serverConfig, createServer} from '@superflyxxi/common';
import {connect as connectDatabase} from './db/index.js';
import route from './routes/posts.js';

await connectDatabase();

const app = createServer('Posts', function (server) {
	server.use('/v1/posts', route);
});
app.listen(serverConfig.port, function () {
	console.log('Started Posts (', serverConfig.version, ') listening on', serverConfig.port);
});

export default app;
