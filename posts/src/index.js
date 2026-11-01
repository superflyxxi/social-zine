import {serverConfig, createServer} from '@superflyxxi/common';
import {connect as connectDatabase} from './db/index.js';
import route from './routers/posts.js';

await connectDatabase();

const app = createServer('Posts', (server) => {
	server.use('/v1/posts', route);
});
app.listen(serverConfig.port, () => {
	console.log('Started Posts (', serverConfig.version, ') listening on', serverConfig.port);
});

export default app;
