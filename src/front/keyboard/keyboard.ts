import {
    SVGeventsCancelAll,
    cancelEventsFromElementAndChild,
    removeObjByID
} from './SVGcancel/SVGeventCancel'
import {
    lineTempID
} from '../StyleConfig/geometryStyleConfig'
import {
    IDsvg,
    SVGdiv
} from '../StyleConfig/elemConfig'

export const esc = (SVG, event: KeyboardEvent) => {
    if (event.keyCode == 27) { // event.code = event.key = Escape
        console.log(`Нажата Esc keyboard`)
        SVGeventsCancelAll(SVG)
        removeObjByID(lineTempID)
        cancelEventsFromElementAndChild(IDsvg, SVGdiv)
    }
}
