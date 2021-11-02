import express from 'express';
import {startServer} from '@superflyxxi/common';
import {server} from './config/index.js';

const app = startServer(server.port, 'Template', server.version, function(server) {
// add your api to server here
});
export default app;
