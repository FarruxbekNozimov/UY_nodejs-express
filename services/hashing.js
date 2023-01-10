function hashing(pswd) {
	let alpha =
		"abcdefjhijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRST1234567890!@#$%^&*()-+*/=";
	alpha += alpha;
	let res = "hash-";
	for (let i = 0; i < pswd.length; i++) {
		res += alpha[alpha.indexOf(pswd[i]) + 7];
	}
	return res;
}

function unhashing(pswd) {
	let alpha =
		"abcdefjhijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRST1234567890!@#$%^&*()-+*/=";
	alpha += alpha;
	pswd = pswd.slice(5);
	let res = "";
	for (let i = 0; i < pswd.length; i++) {
		res += alpha[alpha.lastIndexOf(pswd[i]) - 7];
	}
	return res;
}

export { hashing, unhashing };
