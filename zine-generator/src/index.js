import express from 'express';
import {startServer} from '@superflyxxi/common';
import {server} from './config/index.js';

const app = startServer(server.port, 'Zines', server.version, function(server) {
});
export default app;
