import {createServer} from '@superflyxxi/common';
import {server} from './config/index.js';

const app = createServer('Zines', server.version);
app.listen(server.port, () => {
	console.log('Started Zines (', server.version, ') listening on', server.port);
});
export default app;
