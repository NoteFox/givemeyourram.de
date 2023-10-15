function createNumberArray(max) {
	return Array.from(Array(max + 1), (_, x) => x)
}

HTMLCollection.prototype.toConnectedArray = function () {
	const connectedArray = []
	for (const block of this) {
		connectedArray.push(block)
	}
	return connectedArray
}

Array.prototype.last = function () {
	return this[this.length - 1]
}

Array.prototype.first = function () {
	return this[0] ?? null
}

Element.prototype.appendBefore = function (element) {
	element.parentNode.insertBefore(this, element);
};