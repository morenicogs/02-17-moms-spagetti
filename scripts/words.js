function pasteWords(myTxt) {

	clearChildren(divClipboardContent)

	const newTextarea = createTextarea()
	newTextarea.value = myTxt
	divClipboardContent.append(newTextarea)

	const newNumbers = convertTxtToNums(myTxt)
	return newNumbers
}

function createTextarea() {
	const myTextarea = document.createElement("textarea")
	myTextarea.classList.add("form-control")
	myTextarea.setAttribute("id", "textareaMyInput")
	myTextarea.setAttribute("disabled", "")
	return myTextarea
}

function createWords(numbs) {
	const newWords = String.fromCharCode(...numbs)
	return newWords
}

