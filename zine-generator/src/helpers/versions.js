function getVersionObject(string) {
	if (string) {
		const splt = string.split('.');
		return {
			major: splt[0] ? Number.parseInt(splt[0], 10) : undefined,
			minor: splt[1] ? Number.parseInt(splt[1], 10) : undefined,
			patch: splt[2] ? Number.parseInt(splt[2], 10) : undefined,
		};
	}

	return {};
}

export {getVersionObject};
