import {
    elemMouseover
} from '../../../StyleConfig/geometryStyleConfig'


export const highlightingElemOver = (classElem: string) => {
    let elemArr: any = document.querySelectorAll('.' + classElem)
    for (let i = 0; i < elemArr.length; i++) {
        let elem = elemArr[i]
        elem.addEventListener('mouseover', backlight.bind(null, elem, elemMouseover))
        elem.addEventListener('mouseout', deleteBacklight.bind(null, elem, elemMouseover))
    }
}

export const highlightingElemOut = (classElem: string, SVG: any) => {
    let elemArr: any = document.querySelectorAll('.' + classElem)
    for (let i = 0; i < elemArr.length; i++) {
        // клонирование элемента (для удаления всех addEventListener)
        let clone = elemArr[i].cloneNode(false)
        elemArr[i].remove()
        let width = parseInt(clone.getAttribute('r')) * 2 
        let cx = parseInt(clone.getAttribute('cx'))
        let cy = parseInt(clone.getAttribute('cy'))
        let className = clone.getAttribute('class')
        let fill = clone.getAttribute('fill')
        let lineClone = SVG.circle(width).move(cx - width / 2, cy - width / 2).attr('class', className)
        lineClone.fill({ color: fill })
    }
}

export const deleteClassFromAll = (className: string) => {
    let elemArr: any = document.querySelectorAll('.' + className)
    for (let i = 0; i < elemArr.length; i++) {
        elemArr[i].classList.remove(className)
    }
}


const backlight = (elem, className: string) => {
    elem.classList.add(className)
}

const deleteBacklight = (elem, className: string) => {
    elem.classList.remove(className)
}
