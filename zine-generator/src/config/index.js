import fs from 'node:fs';

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
