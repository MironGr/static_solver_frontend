
// вспомогательные переменные для реализации создания отрезка
let bool: boolean = false

// надуровень для экспорта отвечающий за нажатие по области SVG
export const createLine = (SVG) => {
    SVG.on('click', createLineSVG.bind(null, SVG))
}

// функция реализации логики создания отрезка
const createLineSVG = (SVG, e) => {
    // получение границ элемента
    const svgXY = SVG.rbox()
    //аналог e.clientX - svgXY.left - SVG.clientLeft не работает
    const x1: number = e.clientX - svgXY.x
    const y1: number = e.clientY - svgXY.y
    console.log(` SVG - ${x1} - ${y1}`)
    // обработчик изменения длины отрезка вслед за перемещением мыши
    SVG.on('mousemove', mousemoveLineSVG.bind(null, SVG, bool))
    // отключения обратотчика createLineSVG
    SVG.off('click')  
    // протестировать добавление линии
    // придумать хранение нарисованных объектов на фронте (в виде тегов / в сторедж сессии / JSON)
    // придумать относительное позиционирование линий относительно друг друга
}

const mousemoveLineSVG = (SVG, bool, e) => {
    const svgXY = SVG.rbox()
    console.log(`${e.clientX - svgXY.x} - ${e.clientY - svgXY.y} - ${bool}`)
    // добавление обработчика для создания 2й точки отрезка
    SVG.on('click', clickEndLineSVG.bind(null, SVG))
}

const clickEndLineSVG = (SVG, e) => {
    const svgXY = SVG.rbox()
    const x2: number = e.clientX - svgXY.x
    const y2: number = e.clientY - svgXY.y
    console.log(`Click 2 ${x2} - ${y2}`)
    // отключение обаботчика clickEndLineSVG
    SVG.off('click')
    // отключение обработчика mousemoveLineSVG
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