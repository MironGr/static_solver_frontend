export const SVGeventsCancelAll = (SVG) => {
	SVG.off('click')
	SVG.off('mousemove')
	// добавить по мере необходимости
}

// удаление обработчиков событий с потомков SVG путем клонирования
export const cancelEventsFromElementAndChild = (idElem: string, parentElem: string) => {
	const rootElem = document.querySelector('#' + idElem)
	const childLineList = rootElem.querySelectorAll('line')
	const childCircleList = rootElem.querySelectorAll('circle')
	const childLineListCopy = Array.from(childLineList).slice()
	const childCircleListCopy = Array.from(childCircleList).slice()
	
	while (rootElem.firstChild) {
		rootElem.removeChild(rootElem.firstChild)
	}
	childLineListCopy.forEach(e => {
		let newElem = e.cloneNode(false)
		rootElem.appendChild(newElem)
	})

	childCircleListCopy.forEach(e => {
		let newElem = e.cloneNode(false)
		rootElem.appendChild(newElem)
	})
}

export const removeObjByID = (elemID: string) => {
	let elem = document.querySelector('#' + elemID)
	if (elem) {
		elem.remove()
	}
}