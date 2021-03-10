import { createSessionStorage } from '../../../SessionStorage/storage'
import { IDsvg } from '../../../StyleConfig/elemConfig'
import {
    colorLine,
    widthLine,
    linecap,
    opacity,
    circleEdgeClass
} from '../../../StyleConfig/geometryStyleConfig'
import {
    linesObjName
} from '../../../StyleConfig/jsonConfig'
import { lineToJSON } from './lineToJSON'
import { lineTempView } from './lineTempView'
import {
    getNextID,
    getObjectMain
} from './objGetFromStorage'
import { setLineToStorage } from './linesSetToStorage'
import { highlightingElemOver } from './highlightingElements'
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

// надуровень для экспорта отвечающий за нажатие по области SVG
export const createLine = (SVG) => {
    SVG.on('click', createLineSVG.bind(null, SVG))
}

// функция реализации логики создания отрезка
const createLineSVG = (SVG, e) => {
    // создание объекта geometry в sessionStorage если сессия пустая
    createSessionStorage()
    console.log(createSessionStorage())
    // получение границ элемента
    const svgXY = SVG.rbox()
    // точные координаты начальной точки
    x1 = e.pageX - svgXY.x
    y1 = e.pageY - svgXY.y
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
    // протестировать добавление линии
    // придумать хранение нарисованных объектов на фронте (в виде тегов / в сторедж сессии / JSON)
    // придумать относительное позиционирование линий относительно друг друга
}

const mousemoveLineSVG = (SVG, e) => {
    const svgXY = SVG.rbox()
    //console.log(`${e.clientX - svgXY.x} - ${e.clientY - svgXY.y}`)
    // назначение атрибутов конца отрезка и стиля временной линии
    lineTemp.setAttributeNS(null, 'x2', (e.pageX - svgXY.x).toString())
    lineTemp.setAttributeNS(null, 'y2', (e.pageY - svgXY.y).toString())
    lineTemp.setAttributeNS(null, 'stroke', colorLine)
    lineTemp.setAttributeNS(null, 'stroke-width', widthLine)
    lineTemp.setAttributeNS(null, 'stroke-linecap', linecap)

    // прерывание команды при нажатии Esc
    document.addEventListener('keydown', () => {
        // удаление временной линии
        lineTemp.remove()
    })
    // добавление обработчика для создания 2й точки отрезка
    SVG.on('click', clickEndLineSVG.bind(null, SVG))

    // подсветка окружностей
    highlightingElemOver(circleEdgeClass)
}

const clickEndLineSVG = (SVG, e) => {
    const svgXY = SVG.rbox()
    // точные координаты конечной точки
    x2 = e.pageX - svgXY.x
    y2 = e.pageY - svgXY.y
    console.log(`Click 2 ${x2} - ${y2}`)
    // подготовка параметров к записи в sessionStorage
    let main: Object = lineToJSON(x1, y1, x2, y2)
    console.log(main)
    //console.log(typeof getLines())
    // отключение обаботчика clickEndLineSVG
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
}

// создание концевых окружностей на линии
const circleOnEdge = (SVG) => {
    let circleStart = SVG.circle(widthLine).move(x1 - widthLine / 2, y1 - widthLine / 2).attr('class', `${circleEdgeClass}`)
    let circleEnd = SVG.circle(widthLine).move(x2 - widthLine / 2, y2 - widthLine / 2).attr('class', `${circleEdgeClass}`)
    circleStart.fill({ color: colorLine })
    circleEnd.fill({ color: colorLine })
}

/*
export class CreateLine {

    private SVG: SVGElement
    private svgXY
    private e: MouseEvent

    constructor(SVGinput) {
        this.SVG = SVGinput
    }
    
    
    public getSVG(): object {
        //return this.SVG
    }
    
    
    public createLineClass(SVG) {
        SVG.on('click', this.createLineSVG.bind(SVG, value))
    }
    

    public createLineSVG(SVG, e: MouseEvent): void {
        SVG.on('click', function () {
            // получение границ элемента
            this.svgXY = SVG.rbox()
            this.SVG = SVG
            //аналог e.clientX - svgXY.left - SVG.clientLeft не работает
            const x1: number = e.clientX - this.svgXY.x
            const y1: number = e.clientY - this.svgXY.y
            let bool: boolean = false
            //if (!bool) {
            console.log(`SVG Class! - ${x1} - ${y1}`)
            //bool = true
            SVG.on('mousemove', this.mousemoveLineSVG())
            console.log('!!!!')
            //SVG.on('mousemove', this.mousemoveLineSVG.bind(null, SVG, bool))
            //console.log(bool)
            // } else {
            //    console.log(`xxx`)
            //}
        })
    }

    public mousemoveLineSVG(e: MouseEvent): void {
        //const svgXY = SVG.rbox()
        console.log(`${e.clientX - this.svgXY.x} - ${e.clientY - this.svgXY.y}`)
        console.log(`${typeof e}`)
        //if (!bool) {
        this.SVG.on('click', this.clickEndLineSVG.bind(null, SVG))
        //}
    }

    private clickEndLineSVG(SVG, e: MouseEvent): void {
        const svgXY = SVG.rbox()
        const x2: number = e.clientX - svgXY.x
        const y2: number = e.clientY - svgXY.y
        console.log(`Click 2 ${x2} - ${y2}`)
        SVG.off('click')
    }
}
*/