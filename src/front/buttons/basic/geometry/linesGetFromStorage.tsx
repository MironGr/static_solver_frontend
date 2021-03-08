import { createSessionStorage } from '../../../SessionStorage/storage'
import {
    geometryObj
} from '../../../StyleConfig/jsonConfig'

export const getLines = () => {
    createSessionStorage()
    

}

const isLinesJSON = () => {
    let geom: Object = sessionStorage.getItem(geometryObj)
    
}