import {startServer} from '@superflyxxi/common';
import {server} from './config/index.js';

const app = startServer('Zines', server.version);
	app.listen(server.port, () => {
		console.log('Started', title, '(', server.version, ') listening on', server.port);
	});
export default app;
