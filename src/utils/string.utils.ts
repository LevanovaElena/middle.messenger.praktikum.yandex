import {isObject} from "./object.utils.ts";


export type StringIndexed = Record<string, unknown>;

/**
 * Напишите функцию, которая умеет удалять из начала и конца строки пробельные или отдельно заданные пользовательские символы. Удаление пробелов из начала и конца строк — поведение по умолчанию. Пробел необязательно должен быть передан в качестве аргумента.
 * @param str -строка для анализа
 * @param deleted -удаляемые символы
 */
export const trim = (str: string, deleted?: string): string => {
    if (str && !deleted) return str.trim();
    const chars = deleted?.split("").map(item => "\\" + item).join('');
    const regexp = new RegExp(`[${chars}]`, 'g');
    const array = str.split('');
    let startWord = 0;
    for (let i = 0; i < array.length; i++) {
        if (!array[i].match(regexp)) {
            startWord = i;
            break;
        }
    }
    let endWord = 0;
    for (let i = array.length - 1; i > startWord; i--) {
        if (!array[i].match(regexp)) {
            endWord = i + 1;
            break;
        }
    }

    return str.substring(startWord, endWord);
}

/**
 *  Get string of query params from object params
 * @param data
 */
export function queryStringify(data: StringIndexed) {
    if (!isObject(data)) {
        throw Error('Input must be an object')
    }
    const result: string[] = [];
    Object.entries(data).map(([key, value]) => {
        valueToString(key, value, result)
    })
    return '?' + result.join("&");
}

export const objToString = (keyItog: string, value: object, resultArray: string[]) => {
    Object.entries(value).map(([key, value]) => {
        valueToString(`${keyItog}[${key}]`, value, resultArray)
    })
}

export const arrayToString = (key: string, value: Array<unknown>, resultArray: string[]) => {
    value.map((item, index) => {
        valueToString(`${key}[${String(index)}]`, item, resultArray)
    })
}

export const valueToString = (key: string, value: unknown, result: string[]) => {
    if (Array.isArray(value)) return arrayToString(key, value, result);
    if (isObject(value)) return objToString(key, value as NonNullable<unknown>, result);
    result.push(`${key}=${String(value)}`);
}
