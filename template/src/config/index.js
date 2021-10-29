import fs from 'node:fs';

const server = {
	port: 3000,
	version: getVersion(),
};

function getVersion() {
	return fs.readFileSync('./src/version.txt', {encoding: 'utf-8'}).trim();
}

export {server};
