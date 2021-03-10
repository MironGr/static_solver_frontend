import { createSessionStorage } from '../../../SessionStorage/storage'
import {
    linesObjName
} from '../../../StyleConfig/jsonConfig'

export const getNextID = (objName: string): number => {
    createSessionStorage()
    let objectsArr: object[] = JSON.parse(sessionStorage.getItem(`${objName}`))
    if (objectsArr.length == 0) {
        return 1
    }
    // массив ID линий для назначения следующего ID
    let objectsIDArr: Array<number> = new Array()
    for (let i = 0; i < objectsArr.length; i++) {
        objectsIDArr.push(objectsArr[i][0]['ID'])
    }
    // вернется последний номер ID увеличенный на 1
    return objectsIDArr.sort(function (a: number, b: number) {
        return a - b
    })[objectsIDArr.length - 1] + 1
}

export const getObjectMain = (objName: string, ID: number): object => {
    createSessionStorage()
    let objectsArr: object[] = JSON.parse(sessionStorage.getItem(`${objName}`))
    for (let i = 0; i < objectsArr.length; i++) {
        if (objectsArr[i][0]['ID'] == ID) {
            return objectsArr[i][1]['main']
        }
    }
    return []
}
