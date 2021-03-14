import {
    lineClassCSS,
    elemMouseover
} from '../../StyleConfig/geometryStyleConfig'
import { IDsvg } from '../../StyleConfig/elemConfig'

export const chooseObjectSVG = () => {
    let root = document.querySelector('#' + IDsvg)
    let linesList = root.querySelectorAll('.' + lineClassCSS)
    for (let i = 0; i < linesList.length; i++) {
        let elem = linesList[i]
        elem.addEventListener('mouseover', backlight.bind(null, elem, elemMouseover))
        elem.addEventListener('mouseout', deleteBacklight.bind(null, elem, elemMouseover))
        elem.addEventListener('click', getLineLengthAndAngle.bind(null, elem))
    }
    console.log(linesList)
}

const backlight = (elem, className: string) => {
    elem.classList.add(className)
}

const deleteBacklight = (elem, className: string) => {
    elem.classList.remove(className)
}

const getLineLengthAndAngle = (elem: HTMLElement) => {
    let x1: number = parseInt(elem.getAttributeNS(null, 'x1'))
    let y1: number = parseInt(elem.getAttributeNS(null, 'y1'))
    let x2: number = parseInt(elem.getAttributeNS(null, 'x2'))
    let y2: number = parseInt(elem.getAttributeNS(null, 'y2'))
    let length: number = Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)))
    let angle: number = Math.round((Math.atan(Math.abs(y1 - y2) / Math.abs(x1 - x2)) * 180) / Math.PI)
    console.log('l = ' + length + " - angle = " + angle)
}
