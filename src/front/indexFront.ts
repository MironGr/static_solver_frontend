import { SVG, Element as SVGElement, extend as SVGextend } from '@svgdotjs/svg.js'

// импорт стилей
import { IDsvg, SVGdiv } from './StyleConfig/elemConfig'

import { createLine } from './buttons/basic/geometry/line'
import { clearField } from './buttons/editing/clear'
import { chooseObjectSVG } from './buttons/editing/supportForGeometry'
import { highlightingElemOver } from './buttons/basic/geometry/highlightingElements'
import { lineClassCSS } from './StyleConfig/geometryStyleConfig'
import { esc } from './keyboard/keyboard'
import './styles/styles.css'

// создание тега <svg> 
const area = SVG().addTo('#' + SVGdiv).size(500, 200).id(IDsvg)
//const areaTeg = document.querySelector('#SVGvector')
// кнопки
const lineButton: Element = document.querySelector('.create_line')
const clearButton: Element = document.querySelector('.clear_field')
// получение данных
const getButton: Element = document.querySelector('.get_storage')
// кнопка выбора объекта
const chooseObj: Element = document.querySelector('.choose_object')

// Обработчики на кнопки создания геометрии:
// создание отрезка
lineButton.addEventListener('click', createLine.bind(null, area))
// очистка поля с геометрией
clearButton.addEventListener('click', clearField)

// выбрать объект
chooseObj.addEventListener('click', chooseObjectSVG.bind(null, lineClassCSS))

// получение данных
/*
getButton.addEventListener('click', () => {
    let geom = JSON.parse(sessionStorage.getItem('geometry'))
    geom.lines = [123, 222]
    console.log(geom.lines)
})
*/
// обработчики клавиатуры
document.addEventListener('keydown', esc.bind(null, area))
