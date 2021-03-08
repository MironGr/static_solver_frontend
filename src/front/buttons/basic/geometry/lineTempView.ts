import { IDsvg } from '../../../StyleConfig/elemConfig'

// временное отображение линии до выбора конечной точки отрезка
export const lineTempView = (
    x1: number,
    y1: number,
) => {
    let SVG = document.querySelector(`#${IDsvg}`);
    let svgNS = "http://www.w3.org/2000/svg";
    // создание элемента <line>
    let line = document.createElementNS(svgNS, 'line');
    // назначение атрибутов
    line.setAttributeNS(null, 'x1', x1.toString())
    line.setAttributeNS(null, 'y1', y1.toString())
    SVG.append(line)
    return line
}