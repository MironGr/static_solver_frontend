import {
	geometryObj,
	geometry
} from '../StyleConfig/jsonConfig'

/*
 * Вся информация о геометрии хранится в формате JSON
 * {'geometry': [
 *		{ 'lines': [
 *			{'line_1': [
 *				{'main': [{'x1': 123}, 'y1', 'x2', 'y2', ...]},
 *				{'ralationship': ['line_2', 'line_5', 'limit1_1', ...]}]
 *			},
 *			{'line_2':
 *				{'main': [...]},
 *				{'ralationship': [...]}
 *			},
 *			...
 *		},
 *		{ 'limitation1':
 *			{'limit1_1': 
 *				{'main': []},
 *			},
 *			...
 *		},
 *		{'force':
 *			{'force_1':
 *				{'main': []},
 *				{'relationship': []}
 *			},
 *			...
 *		}
 *		]
 *		
 *	}
 */

export const createSessionStorage = () => {
	if (!isSessionStorage()) {
		// создание корневого объекта, создание структуры хранилища JSON
		sessionStorage.setItem(geometryObj, JSON.stringify(geometry))
	} 
}

export const isSessionStorage = () => {
	if (sessionStorage.getItem(geometryObj) == null) {
		return false
	} else {
		return true
	}
}
