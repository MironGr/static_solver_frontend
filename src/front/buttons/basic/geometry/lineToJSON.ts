import {
    colorLine,
    widthLine,
    linecap
} from '../../../geomentryStyleConfig/geometryStyleConfig'

export const lineToJSON = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
    ) => {
    let main: Object = [
        { 'x1': x1 },
        { 'y1': y1 },
        { 'x2': x2 },
        { 'y2': y2 },
        { 'color': colorLine },
        { 'width': widthLine },
        { 'linecap': linecap }
    ]
    return main
}