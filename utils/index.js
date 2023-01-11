import moment from "moment";

export default {
	ifequal(a, b, options) {
		return a == b ? options.fn(this) : options.inverse(this);
	},
	isAdmin(role, options) {
		return role == "admin" || role == "owner"
			? options.fn(this)
			: options.inverse(this);
	},
	sliceDescription(text) {
		let theString = text.toString().slice(0, 120);
		return theString;
	},
	formatDate(date, whr = 1) {
		if (whr == 1) {
			return moment(date).fromNow("DD/MM/YYYY");
		} else if (whr == 2) {
			return moment(date).format("HH:mm");
		} else {
			return moment(date).format("HH:mm DD-MM-YYYY");
		}
	},
	tableCutter(txt) {
		return txt.length > 25 ? txt.toString().slice(0, 10) + " ..." : txt;
	},
	checkOwner(role, currentRole, options) {
		if (currentRole == "owner") return options.fn(this);
		if (role == "owner") return options.inverse(this);
		return options.fn(this);
	},
	avatarTxt(a, b) {
		return (a.slice(0, 1) + "." + b.slice(0, 1)).toUpperCase();
	},
	showObject(obj, value, options) {
		console.log(obj, value);
		return obj[value];
	},
};
