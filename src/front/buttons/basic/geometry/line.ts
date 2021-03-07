
// ��������������� ���������� ��� ���������� �������� �������
let bool: boolean = false

// ���������� ��� �������� ���������� �� ������� �� ������� SVG
export const createLine = (SVG) => {
    SVG.on('click', createLineSVG.bind(null, SVG))
}

// ������� ���������� ������ �������� �������
const createLineSVG = (SVG, e) => {
    // ��������� ������ ��������
    const svgXY = SVG.rbox()
    //������ e.clientX - svgXY.left - SVG.clientLeft �� ��������
    const x1: number = e.clientX - svgXY.x
    const y1: number = e.clientY - svgXY.y
    console.log(` SVG - ${x1} - ${y1}`)
    // ���������� ��������� ����� ������� ����� �� ������������ ����
    SVG.on('mousemove', mousemoveLineSVG.bind(null, SVG, bool))
    // ���������� ����������� createLineSVG
    SVG.off('click')  
    // �������������� ���������� �����
    // ��������� �������� ������������ �������� �� ������ (� ���� ����� / � ������� ������ / JSON)
    // ��������� ������������� ���������������� ����� ������������ ���� �����
}

const mousemoveLineSVG = (SVG, bool, e) => {
    const svgXY = SVG.rbox()
    console.log(`${e.clientX - svgXY.x} - ${e.clientY - svgXY.y} - ${bool}`)
    // ���������� ����������� ��� �������� 2� ����� �������
    SVG.on('click', clickEndLineSVG.bind(null, SVG))
}

const clickEndLineSVG = (SVG, e) => {
    const svgXY = SVG.rbox()
    const x2: number = e.clientX - svgXY.x
    const y2: number = e.clientY - svgXY.y
    console.log(`Click 2 ${x2} - ${y2}`)
    // ���������� ���������� clickEndLineSVG
    SVG.off('click')
    // ���������� ����������� mousemoveLineSVG
    SVG.off('mousemove')
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