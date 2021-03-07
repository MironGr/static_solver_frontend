import { SVGeventsCancelAll } from './SVGcancel/SVGeventCancel'

export const esc = (SVG, event: KeyboardEvent) => {
    if (event.keyCode == 27) { // event.code = event.key = Escape
        console.log(`Нажата Esc`)
        SVGeventsCancelAll(SVG)
    }
}
