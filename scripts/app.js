window.addEventListener("paste", handlePaste)
window.addEventListener("copy", handleCopy)

const divClipboardContent = document.getElementById("divClipboardContent")

// Extra Initial values
const initialVomitColorDec = 8421376
let currentNumbers

function handlePaste(e) {
	currentNumbers = []
	const myText = e.clipboardData.getData("text/plain")
	
	const myFiles = e.clipboardData.files
	if(myFiles.length > 0 && !myText) {
		const myURL = URL.createObjectURL(myFiles[0])
		currentNumbers = pasteVomit(myURL)
	}
	
	if(myText) {
		if(myText.startsWith("<svg") || myText.startsWith("<?xml")) {
			currentNumbers = pasteSpaghetti(myText)
			console.log("SVG")
		} else {
			currentNumbers = pasteWords(myText)
		}
		
	}
	if(e.clipboardData.getData("image/svg+xml")) {
		console.log("fired")
		const mysvg = e.clipboardData.getData("image/svg+xml")
		divClipboardContent.append(mysvg)
	}
	


}

function handleCopy(e) {
	if(currentNumbers?.length > 0 ) {
		const selectCopyStyle = document.getElementById("selectCopyStyle")
		if(selectCopyStyle.value == "words") {
			const newWords = createWords(currentNumbers)
			e.clipboardData.setData("text/plain", newWords) 
		}
		if(selectCopyStyle.value == "vomit") {
			const newCanvas = createVomit(currentNumbers)
			newCanvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]))
		}
		if(selectCopyStyle.value == "spaghetti") {
			const mySvg = createSpaghetti(currentNumbers)
			e.clipboardData.setData("text/plain", mySvg)
		}
		
		e.preventDefault();
	}
}

function setPreviewImage(file) {
	const fileReader = new FileReader()
	fileReader.readAsDataURL(file)
}

function convertTxtToNums(txt){
	const myNumbers = []
	for (let i = 0; i < txt.length; i++) {
		const newNumber = txt[i].charCodeAt(0);
		myNumbers.push(newNumber)
		
	}
	return myNumbers
	
}

function convertNumsToTxt(nums) {
	const myTxt = String.fromCharCode(...nums)
	return myTxt
}

function convertNumToHex(nums) {
	const newHexs = []
	for (let i = 0; i < nums.length; i++) {
		const newColorDec = initialVomitColorDec + (nums[i]*1)
		const newColorHex = newColorDec.toString(16)
		newHexs.push(newColorHex.toUpperCase())
		
	}
	return newHexs
}

function convertHexsToNums(hexs) {
	const nums = []
	for (let i = 0; i < hexs.length; i++) {
		const myColorDec = parseInt(hexs[i], 16)
		const newNum = myColorDec - initialVomitColorDec
		nums.push(newNum)
	}
	return nums
}

function convertRGBToHex(r, g, b) {

}

function testTxtNums() {
	const myNumbers = convertTxtToNums(textareaMyInput.value)
	const myTxt = convertNumsToTxt(myNumbers)
	if(textareaMyInput.value == myTxt) console.log("✅")
	else console.log("❌")
	console.log(myTxt)
}

function testNumHex() {

}

function testCanvas() {
	// asdfasdfasfd./1-203*`~=-_–
	const myNumbers = convertTxtToNums(textareaMyInput.value)
	console.log(myNumbers)
	const myHexs = convertNumToHex(myNumbers)
	const myCanvas = convertHexsToCanvas(myHexs)
	const newHexes = convertCanvasToHexs(myCanvas)
	const newNumbers = convertHexsToNums(newHexes)
	const newTxt = convertNumsToTxt(newNumbers)
	if(textareaMyInput.value == newTxt) console.log("well Done")
	return newTxt
}

function convertHexsToCanvas(hexs) {
	const newCanvas = document.createElement("canvas")
	const newContext = newCanvas.getContext("2d")
	const myWidth = Math.floor(Math.sqrt(hexs.length))
	const myHeight = Math.ceil(hexs.length/myWidth)
	newCanvas.width = myWidth +1
	newCanvas.height = myHeight -1

	let currentIndex = 0

	for (let y = 0; y <= myHeight; y++) {
		for (let x = 0; x <= myWidth; x++) {
			if(currentIndex < hexs.length) {
				newContext.fillStyle = `#${hexs[currentIndex]}`
				newContext.fillRect(x, y, 1, 1)
				// console.log(`${currentIndex} [${x}, ${y}] : ${hexs[currentIndex]}`)
			}
			currentIndex++
		}
		
	}
	return newCanvas
}

function convertCanvasToHexs(myCanvas) {
	const myContext = myCanvas.getContext("2d");
	const myWidth = myCanvas.width
	const myHeight = myCanvas.height

	const newHexes = []

	for (let y = 0; y < myHeight; y++) {
		for (let x = 0; x < myWidth; x++) {
			const myImageData = myContext.getImageData(x, y, 1, 1)
			if(myImageData.data[3] > 0) {
				const newHex = [myImageData.data[0], myImageData.data[1], myImageData.data[2]].map((x) => x.toString(16).padStart(2, "0")).join("")
				newHexes.push(newHex)
			}
		}
		
	}
	return newHexes
}

function clearChildren(_node) {
	const nodeChildren = _node.children
	for (let i = 0; i < nodeChildren.length; i = 0) {
		nodeChildren[i].remove();
	}

}