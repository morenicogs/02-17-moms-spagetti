function pasteVomit(myURL) {
	const myImg = new Image();
	myImg.src = myURL;
	myImg.setAttribute("class", "object-fit-cover vomit")
	const newCanvas = document.createElement("canvas")
	const myContext = newCanvas.getContext("2d");

	clearChildren(divClipboardContent)

	myImg.onload = () => {
		myContext.drawImage(myImg, 0, 0);
		divClipboardContent.append(myImg)
		
		const newHexes = convertCanvasToHexs(newCanvas)
		const newNumbers = convertHexsToNums(newHexes)
		currentNumbers = newNumbers
	}
}

function createVomit(numbs) {
	const myHexs = convertNumToHex(numbs)
	const myCanvas = convertHexsToCanvas(myHexs)
	return myCanvas
}