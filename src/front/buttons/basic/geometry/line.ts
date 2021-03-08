import { createSessionStorage } from '../../../SessionStorage/storage'
import { IDsvg } from '../../../StyleConfig/elemConfig'
import {
    colorLine,
    widthLine,
    linecap
} from '../../../StyleConfig/geometryStyleConfig'

import { lineToJSON } from './lineToJSON'
import { lineTempView } from './lineTempView'
import { getLines } from './linesGetFromStorage'
import { Element } from '@svgdotjs/svg.js'

// ��������������� ���������� ��� ���������� �������� �������
let x1: number
let y1: number
let x2: number
let y2: number
let line: Element
let lineTemp: any
let SVGtemp: any

// ���������� ��� �������� ���������� �� ������� �� ������� SVG
export const createLine = (SVG) => {
    SVG.on('click', createLineSVG.bind(null, SVG))
}

// ������� ���������� ������ �������� �������
const createLineSVG = (SVG, e) => {
    // �������� ������� geometry � sessionStorage ���� ������ ������
    createSessionStorage()
    console.log(createSessionStorage())
    // ��������� ������ ��������
    const svgXY = SVG.rbox()
    const svgViewbox = SVG.viewbox()
    // ������ ���������� ��������� �����
    x1 = e.pageX - svgXY.x
    y1 = e.pageY - svgXY.y
    console.log(`x - ${e.clientX} - ${svgXY.x} - ${e.pageX}`)
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
    // �������������� ���������� �����
    // ��������� �������� ������������ �������� �� ������ (� ���� ����� / � ������� ������ / JSON)
    // ��������� ������������� ���������������� ����� ������������ ���� �����
}

const mousemoveLineSVG = (SVG, e) => {
    const svgXY = SVG.rbox()
    console.log(`${e.clientX - svgXY.x} - ${e.clientY - svgXY.y}`)
    // ���������� ��������� ����� ������� � ����� ��������� �����
    lineTemp.setAttributeNS(null, 'x2', (e.pageX - svgXY.x).toString())
    lineTemp.setAttributeNS(null, 'y2', (e.pageY - svgXY.y).toString())
    lineTemp.setAttributeNS(null, 'stroke', colorLine)
    lineTemp.setAttributeNS(null, 'stroke-width', widthLine)
    lineTemp.setAttributeNS(null, 'stroke-linecap', linecap)
    
    // ���������� ����������� ��� �������� 2� ����� �������
    SVG.on('click', clickEndLineSVG.bind(null, SVG))
}

const clickEndLineSVG = (SVG, e) => {
    const svgXY = SVG.rbox()
    // ������ ���������� �������� �����
    x2 = e.pageX - svgXY.x
    y2 = e.pageY - svgXY.y
    console.log(`Click 2 ${x2} - ${y2}`)
    // ���������� ���������� � ������ � sessionStorage
    let main: Object = lineToJSON(x1, y1, x2, y2)
    console.log(main)
    //console.log(typeof getLines())
    // ���������� ���������� clickEndLineSVG
    SVG.off('click')
    // ���������� ����������� mousemoveLineSVG
    SVG.off('mousemove')
    // �������� ��������� �����
    lineTemp.remove()
    const x22: number = x2
    const y22: number = y2
    // ���������� ����� �� SVG.js
    line = SVG.line(x1, y1, x2, y2)
    line.stroke({ color: colorLine, width: widthLine, linecap: linecap })
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
            // ��������� ������ ��������
            this.svgXY = SVG.rbox()
            this.SVG = SVG
            //������ e.clientX - svgXY.left - SVG.clientLeft �� ��������
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