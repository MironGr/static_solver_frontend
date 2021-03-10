import {
	linesObjName,
	linesObj,
	limit1ObjName,
	limit1Obj,
	limit2ObjName,
	limit2Obj,
	limit3ObjName,
	limit3Obj,
	forcesObjName,
	forcesObj
} from '../StyleConfig/jsonConfig'

/*
 * Вся информация о геометрии хранится в формате JSON
 * 	{ 'lines': [
*			[{'ID': 'line_1'}, 
*				{'main': [{'x1': 123}, 'y1', 'x2', 'y2', ...]},
*				{'ralationship': ['line_2', 'line_5', 'limit1_1', ...]}]
*			}],
*			...
*		},
*	{ 'limitation1':[
*			[{'ID': 'line_1'},
*				{'main': [{'x1': 123}, 'y1', 'x2', 'y2', ...]},
*				{'ralationship': ['line_2', 'line_5', 'limit1_1', ...]}]
*			}],
*			...
*		},
*	{'force':[
*			[{'ID': 'line_1'},
*				{'main': [{'x1': 123}, 'y1', 'x2', 'y2', ...]},
*				{'ralationship': ['line_2', 'line_5', 'limit1_1', ...]}]
*			}],
*			...
*		}
 */

export const createSessionStorage = () => {
	if (!isSessionStorage()) {
		// создание корневого объекта, создание структуры хранилища JSON
		sessionStorage.setItem(linesObjName, JSON.stringify(linesObj))
		sessionStorage.setItem(limit1ObjName, JSON.stringify(limit1Obj))
		sessionStorage.setItem(limit2ObjName, JSON.stringify(limit2Obj))
		sessionStorage.setItem(limit3ObjName, JSON.stringify(limit3Obj))
		sessionStorage.setItem(forcesObjName, JSON.stringify(forcesObj))
	} 
}

export const isSessionStorage = () => {
	if (sessionStorage.getItem(linesObjName) == null) {
		return false
	} else {
		return true
	}
}
