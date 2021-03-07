import { SVG, Element as SVGElement, extend as SVGextend } from '@svgdotjs/svg.js'


import { createLine } from './buttons/basic/geometry/line'
import { esc } from './keyboard/keyboard'
import './styles/styles.css'

// создание тега <svg> 
const area = SVG().addTo('.SVGdiv').size(250, 300).id('vector')
//const areaTeg = document.querySelector('#SVGvector')
const lineButton: Element = document.querySelector('.create_line')

// Обработчики на кнопки создания геометрии:
// создание отрезка
lineButton.addEventListener('click', createLine.bind(null, area))

// обработчики клавиатуры
document.addEventListener('keydown', esc.bind(null, area))
