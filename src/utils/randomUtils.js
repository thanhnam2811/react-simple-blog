const ALPHABET =
	'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const getRandomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomString = function (length, numberOnly) {
	let result = '';
	for (let i = 0; i < length; i++) {
		result += numberOnly
			? getRandomNumber(0, 9)
			: ALPHABET[getRandomNumber(0, ALPHABET.length - 1)];
	}
	return result;
};