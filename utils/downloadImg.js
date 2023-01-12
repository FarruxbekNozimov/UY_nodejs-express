import fs from "fs";
import request from "request";

const downloadImg = function (uri, filename, callback) {
	if (!imageExists(uri)) return false;
	request.head(uri, function (err, res, body) {
		console.log("content-type:", res.headers["content-type"]);
		console.log("content-length:", res.headers["content-length"]);
		request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
	});
	return true;
};

function imageExists(imageUrl) {
	let imgs = ["png", "jpeg", "jpg", "gif"];
	return imgs.includes(
		imageUrl.slice(imageUrl.lastIndexOf(".") + 1, imageUrl.length)
	);
}
export default downloadImg;
