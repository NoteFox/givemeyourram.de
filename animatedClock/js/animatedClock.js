const animatedClock = () => {
	const possibleNumberArray = {
		'hh': 3,
		'h': 2,
		'mm': 9,
		'm': 5,
		'ss': 9,
		's': 5,
	}

	const clockElement = document.getElementById('animatedClockContainer')

	const clockSections = createNumberContainers()
	clockSections.forEach( (section) => clockElement.appendChild(section.containerElement))

	const max = clockSections
		.map((element) => element.containerElement.clientHeight)
		.sort((a, b) => {return a > b ? 1 : -1})
		.first()

	for (const child of clockElement.children) {
		child.style.height = max + "px"
		console.log(max + "px")
	}

	const clock = new AnimatedClock()
	clock.container = clockElement
	clockSections.forEach( (section) => clock.addNewSection(section))

	clock.start()

	function createNumberContainers() {
		return Object.entries(possibleNumberArray).map(entry => {
			const rowElement = document.createElement('div')
			rowElement.id = entry[0]
			rowElement.classList.add('numberRow')

			createNumbers(entry[1], rowElement)

			return new ClockEntry(entry[0], rowElement, entry[1])
		})
	}

	function createNumbers(max, outer) {
		createNumberArray(max).map((n) => {
			const number = document.createElement('h1')
			number.innerText = String(n)
			number.classList.add('number')
			return number
		}).forEach((element) => {
			outer.appendChild(element)
		})
	}
}

class ClockEntry {
	id = 0
	/** @type HTMLElement */
	containerElement = null
	max = 0

	constructor(id, element, max) {
		this.id = id
		this.containerElement = element
		this.max = max
	}

	getNumbers() {
		return this.containerElement.children
	}

	getNumber(number) {
		return this.getNumbers()
			.toConnectedArray()
			.filter( (element) => element.innerText === String(number) )
			.first()
	}
}

class AnimatedClock {
	/** @type ClockEntry[] */
	sections = []
	/** @type HTMLElement */
	container = null
	addNewSection(section) {
		this.sections.push(section)
	}

	start() {
		this.resetClock()
		this.startClock()
	}

	resetClock() {
		this.sections.forEach( (section) => {
			this.setSectionTo(section, 0)
		})
	}

	setSectionTo(section, numberPosition) {
		const numberToCenter = section.getNumber(numberPosition)

		const currentY = this.getElementY(numberToCenter)
		const neededY = this.getContainerYCenter() - (this.getElementHeight(numberToCenter) / 2)

		const changeOfMargin = neededY - currentY

		this.changeMarginOfSection(section, changeOfMargin)
	}

	/**
	 * @param section {ClockEntry}
	 * @param marginChange {Number}
	 */
	changeMarginOfSection(section, marginChange) {
		const currentMargin = Number(section.containerElement.style.marginTop.replace('px', '') ?? 0)
		const newMargin = currentMargin + marginChange
		section.containerElement.style.marginTop = newMargin + "px"
	}

	getElementY(element) {
		return element.getBoundingClientRect().y
	}

	getElementHeight(element) {
		return element.clientHeight
	}

	getContainerYCenter() {
		return (this.container.getBoundingClientRect().y
			+ this.container.getBoundingClientRect().bottom) / 2
	}

	mow

	startClock() {

	}
}

addEventListener('DOMContentLoaded', animatedClock)