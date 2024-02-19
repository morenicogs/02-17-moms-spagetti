function convertNumsToPath(nums) {
	let totalPath = "M0,0,"
	let switcher = 1
	for (let i = 0; i < nums.length; i++) {
		
		const randomNumberX = Math.floor(Math.random() * 125)
		const randomNumberY = Math.floor(Math.random() * 125)
		const qubicPath = `Q${nums[i] * switcher},${(randomNumberX+randomNumberY)/2},${randomNumberX},${randomNumberY},`
		totalPath += qubicPath
		switcher = switcher * -1
	}
	const newPath = `<path class="spaghetti" d="${totalPath}"/>`
	return newPath
}

function createSpaghetti(nums) {
	const newPath = convertNumsToPath(nums)
	const newSvg = `<?xml version="1.0" encoding="UTF-8"?>
	<svg id="svgSpaghetti" data-name="spaghetti" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 125">
		<defs>
			<style>
				.spaghetti {
					fill: none;
					stroke: #ffd400;
					stroke-linecap: round;
					stroke-linejoin: round;
					stroke-width: 1px;
				}
			</style>
		</defs>
		${newPath}
	</svg>`

	
	return newSvg
}

function pasteSpaghetti(mySVG) {

	clearChildren(divClipboardContent)

	const parser = new DOMParser()
	const parsedSVG = parser.parseFromString(mySVG, "image/svg+xml")
	const newSvg = parsedSVG.querySelector("svg")
	divClipboardContent.append(newSvg)

	const newNums = []

	const newPaths = newSvg.querySelectorAll("path")
	newPaths.forEach(newPath => {
		const pathNumbs = convertPathToNumbs(newPath)
		newNums.push(...pathNumbs)
	})
	 
	return newNums
}

function convertPathToNumbs(path) {
	const d = path.getAttribute("d")
	const dArray = d.split(',').length > 1 ? d.split(',') : d.split(' ')
	const newNums = []
	dArray.forEach(el => {
		if(el[0] == "Q") {
			const pathCommandsArray = el.split("Q")
			newNums.push(Math.abs(pathCommandsArray[1]))
		}
		if(el[0] == "q") {
			const pathCommandsArray = el.split("q")
			newNums.push(Math.abs(pathCommandsArray[1]))
		}
		if(el[0] == "C") {
			const pathCommandsArray = el.split("C")
			newNums.push(Math.abs(pathCommandsArray[1]))
		}
		if(el[0] == "c") {
			const pathCommandsArray = el.split("c")
			newNums.push(Math.abs(pathCommandsArray[1]))
		}
		if(el[0] == "L") {
			const pathCommandsArray = el.split("L")
			newNums.push(Math.abs(pathCommandsArray[1]))
		}
		if(el[0] == "l") {
			const pathCommandsArray = el.split("l")
			newNums.push(Math.abs(pathCommandsArray[1]))
		}
		if(el[0] == "S") {
			const pathCommandsArray = el.split("S")
			newNums.push(Math.abs(pathCommandsArray[1]))
		}
		if(el[0] == "s") {
			const pathCommandsArray = el.split("s")
			newNums.push(Math.abs(pathCommandsArray[1]))
		}
	});

	console.log(newNums)
	return newNums
}