import { createSessionStorage } from '../../../SessionStorage/storage'
import { IDsvg } from '../../../StyleConfig/elemConfig'
import {
    colorLine,
    widthLine,
    linecap,
    circleEdgeClass,
    elemMouseover,
    lineTempID
} from '../../../StyleConfig/geometryStyleConfig'
import {
    linesObjName
} from '../../../StyleConfig/jsonConfig'
import { lineTempView } from './lineTempView'
import {
    getNextID,
    getObjectMain
} from './objGetFromStorage'
import { setLineToStorage } from './linesSetToStorage'
import {
    highlightingElemOver,
    highlightingElemOut,
    deleteClassFromAll
} from './highlightingElements'
//import { removeTempObj } from '../../../keyboard/SVGcansel/SVGeventCancel'
import { Element } from '@svgdotjs/svg.js'

// вспомогательные переменные для реализации создания отрезка
let x1: number
let y1: number
let x2: number
let y2: number
let line: Element
let lineTemp: any
let SVGtemp: any
let lineID: number
let cx: number
let cy: number

// надуровень для экспорта отвечающий за нажатие по области SVG
export const createLine = (SVG) => {
    SVG.on('click', createLineSVG.bind(null, SVG))
    // включение подсветки окружностей
    highlightingElemOver(circleEdgeClass)
    // обработка привязки к концевым окружностям
    getXYfromCircle(circleEdgeClass)
    console.log('widthLine/10 - ' + widthLine / 10)
}

// функция реализации логики создания отрезка
const createLineSVG = (SVG, e) => {
    // создание объекта geometry в sessionStorage если сессия пустая
    createSessionStorage()

    // получение границ элемента
    const svgXY = SVG.rbox()

    // выбор начальных координат линии (возможна привязка)
    if (cx && cy) {
        x1 = cx
        y1 = cy
        // обнуление перед выбором второй точки отрезка
        cx = undefined
        cy = undefined
    } else {
        // точные координаты начальной точки
        x1 = parseInt(e.pageX) - parseInt(svgXY.x)
        y1 = parseInt(e.pageY) - parseInt(svgXY.y)
    }    
    
    // временная линия для отображения при построении
    lineTemp = lineTempView(x1, y1)
    SVGtemp = document.querySelector(`#${IDsvg}`);
    lineTemp.setAttributeNS(null, 'x1', x1.toString())
    lineTemp.setAttributeNS(null, 'y1', y1.toString())
    SVGtemp.append(lineTemp)

    // обработчик изменения длины отрезка вслед за перемещением мыши
    SVG.on('mousemove', mousemoveLineSVG.bind(null, SVG))
    // отключения обратотчика createLineSVG
    SVG.off('click')  
}

const mousemoveLineSVG = (SVG, e) => {
    const svgXY = SVG.rbox()
    // назначение атрибутов конца отрезка и стиля временной линии
    lineTemp.setAttributeNS(null, 'x2', (e.pageX - svgXY.x).toString())
    lineTemp.setAttributeNS(null, 'y2', (e.pageY - svgXY.y).toString())
    lineTemp.setAttributeNS(null, 'stroke', colorLine)
    lineTemp.setAttributeNS(null, 'stroke-width', widthLine/15)
    lineTemp.setAttributeNS(null, 'stroke-linecap', linecap)
    lineTemp.setAttributeNS(null, 'id', lineTempID)

    // добавление обработчика для создания 2й точки отрезка
    SVG.on('click', clickEndLineSVG.bind(null, SVG))

    
}

const clickEndLineSVG = (SVG, e) => {
    const svgXY = SVG.rbox()
    // выбор конечной точки линии (возможна привязка)
    if (cx && cy) {
        x2 = cx
        y2 = cy
        cx = undefined
        cy = undefined
    } else {
        // точные координаты конечной точки
        x2 = parseInt(e.pageX) - parseInt(svgXY.x)
        y2 = parseInt(e.pageY) - parseInt(svgXY.y)
    }
    
    // для отладки
    console.log(`Click 2 ${x2} - ${y2} -- 123`)

    SVG.off('click')
    // отключение обработчика mousemoveLineSVG
    SVG.off('mousemove')
    // удаление временной линии
    lineTemp.remove()
    // запись параметров линии в sessionStorage
    setLineToStorage(x1, y1, x2, y2)
    // чтение данных из sessionStorage
    lineID = getNextID(linesObjName) - 1
    // объект с данными о линии
    let currentMain: {} = getObjectMain(linesObjName, lineID)
    // добавление линии с помощью SVG.js, данные из sessionStorage
    line = SVG.line(
        currentMain[0]['x1'],
        currentMain[1]['y1'],
        currentMain[2]['x2'],
        currentMain[3]['y2']
    )
    line.stroke({ color: colorLine, width: widthLine, linecap: linecap })
    // добавление id к линии
    line.id('line_' + lineID.toString())
    // создание концевых окружностей
    circleOnEdge(SVG)

    // отключение подсветки окружностей и удаление всех addEventListener на окружностях
    highlightingElemOut(circleEdgeClass, SVG)

    // удаление лишних классов 
    deleteClassFromAll(elemMouseover)

    // обнуление координат концов отрезка
    x1 = undefined
    y1 = undefined
    x2 = undefined
    y2 = undefined
}

// создание концевых окружностей на линии
const circleOnEdge = (SVG) => {
    let circleStart = SVG.circle(widthLine).move(x1 - widthLine / 2, y1 - widthLine / 2).attr('class', `${circleEdgeClass}`)
    let circleEnd = SVG.circle(widthLine).move(x2 - widthLine / 2, y2 - widthLine / 2).attr('class', `${circleEdgeClass}`)
    circleStart.fill({ color: colorLine })
    circleEnd.fill({ color: colorLine })
}

// привязка к окружностям на линии
const getXYfromCircle = (classElem: string) => {
    let elemArr: any = document.querySelectorAll('.' + classElem)

    for (let i = 0; i < elemArr.length; i++) {
        let elem = elemArr[i]
        elem.addEventListener('click', getCxCy.bind(null, elem))
    }
}

const getCxCy = (elem: HTMLElement) => {
    cx = parseInt(elem.getAttribute('cx'))
    cy = parseInt(elem.getAttribute('cy'))
}

