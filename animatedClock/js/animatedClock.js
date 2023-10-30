const animatedClock = () => {
  const possibleNumberArray = {
    'H': 2,
    'h': 9,
    'div_mh': 0,
    'M': 5,
    'm': 9,
    'div_sm': 0,
    'S': 5,
    's': 9,
  }

  const clockElement = document.getElementById('animatedClockContainer')

  const clock = new AnimatedClock()

  const clockSections = createNumberContainers(clock)

  function connectClockSections(clockSections) {
    clockSections.forEach((section) => {
      const currentIndex = clockSections.findIndex((section_b) => {
        return section.compareWith(section_b)
      })

      section.next = clockSections[currentIndex + 1] ?? null

      section.prev = clockSections[currentIndex - 1] ?? null
    })
  }

  connectClockSections(clockSections)

  clockSections.forEach((section) => clockElement.appendChild(section.containerElement))

  const max = clockSections
      .map((element) => element.containerElement.clientHeight)
      .sort((a, b) => {
        return a > b ? 1 : -1
      })
      .first()

  for (const child of clockElement.children) {
    child.style.height = max + "px"
  }

  clock.container = clockElement
  clockSections.forEach((section) => clock.addNewSection(section))

  clock.start()

  function createNumberContainers(clock) {
    return Object.entries(possibleNumberArray).map(entry => {
      const rowElement = document.createElement('div')
      rowElement.id = entry[0]
      rowElement.classList.add('numberRow')

      if (entry[0].includes('div')) {
        createDivider(rowElement)
      } else {
        createNumbers(entry[1], rowElement)
      }

      return new ClockEntry(entry[0], rowElement, entry[1], clock)
    })
  }

  function createDivider(outer) {
    const divider = document.createElement('h1')
    divider.innerText = ":"
    outer.appendChild(divider)
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

  clock = null

  current = 0

  /** @type ClockEntry */
  next = null

  /** @type ClockEntry */
  prev = null

  constructor(id, element, max, clock) {
    this.id = id
    this.containerElement = element
    this.max = max
    this.clock = clock
  }

  getNumbers() {
    return this.containerElement.children
  }

  getNumber(number) {
    return this.getNumbers()
        .toConnectedArray()
        .filter((element) => element.innerText === String(number))
        .first() ?? this.getNumbers().toConnectedArray().first()
  }

  getNextNumber() {
    return (this.current + 1) % (this.max + 1)
  }

  nextNumberOutside() {
    return this.getNextNumber() <= this.current
  }

  /**
   * @param marginChange {Number}
   */
  _changeMargin(marginChange) {
    const currentMargin = Number(this.containerElement.style.marginTop.replace('px', '') ?? 0)
    const newMargin = currentMargin + marginChange
    this.containerElement.style.marginTop = newMargin + "px"
  }

  jumpTo(number) {
    const numberToCenter = this.getNumber(number)

    if (!numberToCenter) {
      return
    }

    const currentY = getElementY(numberToCenter)
    const neededY = this.clock.getContainerYCenter() - (getElementHeight(numberToCenter) / 2)

    const changeOfMargin = neededY - currentY

    this._changeMargin(changeOfMargin)

    this.current = number
  }

  jumpToNext() {
    const nextNumber = this.getNextNumber()

    if (this.nextNumberOutside() && this.prev) {
      console.log("jump " + this.prev.id + " to next")

      this.prev.jumpToNext()
    }

    this.jumpTo(nextNumber)
  }

  compareWith(section) {
    return section.id === this.id
  }
}

class AnimatedClock {
  /** @type ClockEntry[] */
  sections = []
  /** @type HTMLElement */
  container = null

  clockSpeed = 1000

  addNewSection(section) {
    this.sections.push(section)
  }

  start() {
    // this.resetClock()
    this.setupClock()

    this.setupTransitionEffect()

    this.startClock()
  }

  resetClock() {
    this.sections.forEach((section) => {
      section.jumpTo(0)
    })
  }

  getContainerYCenter() {
    return (this.container.getBoundingClientRect().y
        + this.container.getBoundingClientRect().bottom) / 2
  }

  startClock() {
    setTimeout(() => {

      // here resides the single clock tick
      this.tick()

      // this runs the clock tick again
      this.startClock()
    }, this.clockSpeed)
  }

  tick() {
    this.sections.last().jumpToNext()
  }

  setupTransitionEffect() {
    this.sections.forEach((section) => {
      section.containerElement.style.transition = "margin-top " + Math.max((this.clockSpeed - 100), 0) + "ms ease-out"
    })
  }

  setupClock() {
    const currentTime = new Date().toLocaleTimeString();

    const reTimeString = /([0-9]{1,2}):([0-9]{2}):([0-9]{2})/

    const foundTime = reTimeString.exec(currentTime)

    const currentHour = foundTime[1].padStart(2, "0").split("")
    const currentMinute = foundTime[2].split("")
    const currentSeconds = foundTime[3].split("")

    this.sections[0].jumpTo(Number(currentHour[0]))
    this.sections[1].jumpTo(Number(currentHour[1]))
    this.sections[2].jumpTo(0)
    this.sections[3].jumpTo(Number(currentMinute[0]))
    this.sections[4].jumpTo(Number(currentMinute[1]))
    this.sections[5].jumpTo(0)
    this.sections[6].jumpTo(Number(currentSeconds[0]))
    this.sections[7].jumpTo(Number(currentSeconds[1]))
  }
}

addEventListener('DOMContentLoaded', animatedClock)