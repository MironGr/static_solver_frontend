import { createSessionStorage } from '../../../SessionStorage/storage'
import {
    linesObjName
} from '../../../StyleConfig/jsonConfig'
import { getNextID } from './objGetFromStorage'


export const setLineToStorage = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
) => {
    // создание корневого объекта хранилища
    createSessionStorage()
    // получение корневого объекта lines
    let linesArr: object[] = JSON.parse(sessionStorage.getItem(`${linesObjName}`))
    // создание объекта линии
    let id: number = getNextID(linesObjName)
    //let id: number = 1
    let line: Array<object> = new Array(
        { 'ID': id },
        {
            'main': [
                { 'x1': x1 },
                { 'y1': y1 },
                { 'x2': x2 },
                { 'y2': y2 },
            ]
        },
        {'relationship': []}
    )
    linesArr.push(line)
    sessionStorage.setItem(`${linesObjName}`, JSON.stringify(linesArr))
}
