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

// ��������������� ���������� ��� ���������� �������� �������
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

// ���������� ��� �������� ���������� �� ������� �� ������� SVG
export const createLine = (SVG) => {
    SVG.on('click', createLineSVG.bind(null, SVG))
    // ��������� ��������� �����������
    highlightingElemOver(circleEdgeClass)
    // ��������� �������� � �������� �����������
    getXYfromCircle(circleEdgeClass)
    console.log('widthLine/10 - ' + widthLine / 10)
}

// ������� ���������� ������ �������� �������
const createLineSVG = (SVG, e) => {
    // �������� ������� geometry � sessionStorage ���� ������ ������
    createSessionStorage()

    // ��������� ������ ��������
    const svgXY = SVG.rbox()

    // ����� ��������� ��������� ����� (�������� ��������)
    if (cx && cy) {
        x1 = cx
        y1 = cy
        // ��������� ����� ������� ������ ����� �������
        cx = undefined
        cy = undefined
    } else {
        // ������ ���������� ��������� �����
        x1 = parseInt(e.pageX) - parseInt(svgXY.x)
        y1 = parseInt(e.pageY) - parseInt(svgXY.y)
    }    
    
    // ��������� ����� ��� ����������� ��� ����������
    lineTemp = lineTempView(x1, y1)
    SVGtemp = document.querySelector(`#${IDsvg}`);
    lineTemp.setAttributeNS(null, 'x1', x1.toString())
    lineTemp.setAttributeNS(null, 'y1', y1.toString())
    SVGtemp.append(lineTemp)

    // ���������� ��������� ����� ������� ����� �� ������������ ����
    SVG.on('mousemove', mousemoveLineSVG.bind(null, SVG))
    // ���������� ����������� createLineSVG
    SVG.off('click')  
}

const mousemoveLineSVG = (SVG, e) => {
    const svgXY = SVG.rbox()
    // ���������� ��������� ����� ������� � ����� ��������� �����
    lineTemp.setAttributeNS(null, 'x2', (e.pageX - svgXY.x).toString())
    lineTemp.setAttributeNS(null, 'y2', (e.pageY - svgXY.y).toString())
    lineTemp.setAttributeNS(null, 'stroke', colorLine)
    lineTemp.setAttributeNS(null, 'stroke-width', widthLine/15)
    lineTemp.setAttributeNS(null, 'stroke-linecap', linecap)
    lineTemp.setAttributeNS(null, 'id', lineTempID)

    // ���������� ����������� ��� �������� 2� ����� �������
    SVG.on('click', clickEndLineSVG.bind(null, SVG))

    
}

const clickEndLineSVG = (SVG, e) => {
    const svgXY = SVG.rbox()
    // ����� �������� ����� ����� (�������� ��������)
    if (cx && cy) {
        x2 = cx
        y2 = cy
        cx = undefined
        cy = undefined
    } else {
        // ������ ���������� �������� �����
        x2 = parseInt(e.pageX) - parseInt(svgXY.x)
        y2 = parseInt(e.pageY) - parseInt(svgXY.y)
    }
    
    // ��� �������
    console.log(`Click 2 ${x2} - ${y2} -- 123`)

    SVG.off('click')
    // ���������� ����������� mousemoveLineSVG
    SVG.off('mousemove')
    // �������� ��������� �����
    lineTemp.remove()
    // ������ ���������� ����� � sessionStorage
    setLineToStorage(x1, y1, x2, y2)
    // ������ ������ �� sessionStorage
    lineID = getNextID(linesObjName) - 1
    // ������ � ������� � �����
    let currentMain: {} = getObjectMain(linesObjName, lineID)
    // ���������� ����� � ������� SVG.js, ������ �� sessionStorage
    line = SVG.line(
        currentMain[0]['x1'],
        currentMain[1]['y1'],
        currentMain[2]['x2'],
        currentMain[3]['y2']
    )
    line.stroke({ color: colorLine, width: widthLine, linecap: linecap })
    // ���������� id � �����
    line.id('line_' + lineID.toString())
    // �������� �������� �����������
    circleOnEdge(SVG)

    // ���������� ��������� ����������� � �������� ���� addEventListener �� �����������
    highlightingElemOut(circleEdgeClass, SVG)

    // �������� ������ ������� 
    deleteClassFromAll(elemMouseover)

    // ��������� ��������� ������ �������
    x1 = undefined
    y1 = undefined
    x2 = undefined
    y2 = undefined
}

// �������� �������� ����������� �� �����
const circleOnEdge = (SVG) => {
    let circleStart = SVG.circle(widthLine).move(x1 - widthLine / 2, y1 - widthLine / 2).attr('class', `${circleEdgeClass}`)
    let circleEnd = SVG.circle(widthLine).move(x2 - widthLine / 2, y2 - widthLine / 2).attr('class', `${circleEdgeClass}`)
    circleStart.fill({ color: colorLine })
    circleEnd.fill({ color: colorLine })
}

// �������� � ����������� �� �����
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

