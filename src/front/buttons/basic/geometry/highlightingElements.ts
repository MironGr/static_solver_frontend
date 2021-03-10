import {
    circleEdgeClass
} from '../../../StyleConfig/geometryStyleConfig'

export const highlightingElemOver = (classElem: string) => {
    let elemArr: any = document.querySelectorAll('.' + circleEdgeClass)
    for (let i = 0; i < elemArr.length; i++) {
        let elem = elemArr[i]
        elemArr[i].addEventListener('mouseover', backlight.bind(null, elem))
    }
}

const backlight = (elem) => {
    console.log(elem.classList.add('elemMouseover'))
}