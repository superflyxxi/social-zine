import fs from 'node:fs';

export const server = {
	port: 3000,
	version: getVersion(),
};

function getVersion() {
	return fs.readFileSync('./src/version.txt', {encoding: 'utf-8'}).trim();
}

export const rankRules = {
	comments: {
		type: 'number',
		scoreMethod: 'PREFER_HIGH',
	},
	likes: {
		type: 'number',
		scoreMethod: 'PREFER_HIGH',
	},
};
