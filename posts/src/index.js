import {serverConfig, createServer} from '@superflyxxi/common';
import dbClient from './db/index.js';

const app = createServer('Posts');
app.listen(serverConfig.port, function () {
	console.log('Started Posts (', serverConfig.version, ') listening on', serverConfig.port);
});
process.on('SIGTERM', function (){
  server.close(function() {
	dbClient.close();
  })
})

export default app;
