allMsg.scrollTo(allMsg.offsetHeight, allMsg.offsetHeight);

let elem = document.getElementById("chatFrame");
function openFullscreen() {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) {
		/* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		/* IE11 */
		elem.msRequestFullscreen();
	}
}

let justMsg = localStorage.getItem("chatJustMsg") || "";
writeArea.value = justMsg;
btnSend.addEventListener("click", () => {
	writeLocal("");
});

function setEmoji(x) {
	writeArea.value += x.innerHTML;
	writeLocal(writeArea.value);
}

function writeLocal(txt) {
	localStorage.setItem("chatJustMsg", txt);
}
writeArea.addEventListener("input", (e) => {
	writeLocal(writeArea.value);
});

writeArea.addEventListener("keydown", (e) => {
	if (e.keyCode == 13) {
		console.log(writeArea);
		writeArea.height = writeArea.height + 50 + "px";
	}
});
