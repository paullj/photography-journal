//  Taken from here: https://javascriptf1.com/snippet/convert-snake-case-to-camel-case-in-javascript
const snakeToCamel = (stringToConvert: string) => {
	return stringToConvert.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) =>
		chr.toUpperCase()
	);
};

type ShallowObject = { [key: string]: string | number };

const keysToCamel = (obj: ShallowObject) => {
	const n: ShallowObject = {};

	Object.keys(obj).forEach((key) => {
		n[snakeToCamel(key)] = obj[key];
	});

	return obj;
};

export { keysToCamel, snakeToCamel };
