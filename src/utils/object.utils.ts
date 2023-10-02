export type Indexed<T = unknown> = {
    [key in string]: T;
};
export const isDeepEqual = <T extends object>(object1: { [index: string]: T }, object2: { [index: string]: T }) => {

    const objKeys1 = Object.keys(object1);
    const objKeys2 = Object.keys(object2);

    if (objKeys1.length !== objKeys2.length) return false;

    for (const key of objKeys1) {
        const value1 = object1[key];
        const value2 = object2[key];

        const isObjects = isObject(value1) && isObject(value2);

        if ((isObjects && !isDeepEqual(value1 as { [index: string]: T }, value2 as { [index: string]: T })) ||
            (!isObjects && value1 !== value2)
        ) {
            return false;
        }
    }
    return true;
};

export function cloneDeep(obj: any): any {
    if (!isObject(obj)) {
        return obj;
    }

    const clonedObj = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // @ts-ignore
            clonedObj[key] = cloneDeep(obj[key]);
        }
    }

    return clonedObj;
}

export const isObject = (object: object | unknown) => {
    return object != null && typeof object === "object";
};

/**
 * Напишите функцию, которая объединит два объекта с сохранением их уникальных ключей. Порядок ключей важен.
 * merge({a: {b: {a: 2}}, d: 5}, {a: {b: {c: 1}}});
 * /*
 * {
 *    a: {
 *        b: {
 *            a: 2,
 *            c: 1,
 *        }
 *    },
 *    d: 5,
 * }
 *
 */

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
    let result = lhs;
    const objKeys1 = Object.keys(lhs);
    const objKeys2 = Object.keys(rhs);
    for (const key of objKeys1) {
        if (objKeys2.indexOf(key) === -1) result[key] = lhs[key];
        else {
            if (typeof lhs[key] === 'object' && typeof rhs[key] === 'object') {
                // @ts-ignore
                result[key] = merge(lhs[key], rhs[key]);
            } else {
                result[key] = lhs[key];
            }
        }
    }

    for (const key of objKeys2) {
        if (objKeys1.indexOf(key) === -1) result[key] = rhs[key];
    }
    return result;
    /*
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
     */

}

/**
 * set, которая получает путь к вложенному свойству объекта и устанавливает значение в это свойство.
 * Если поля не существует, его нужно создать по указанному пути.
 * Проверьте, что path — строка, иначе нужно выбросить ошибку 'path must be string'
 * @param object
 * @param path
 * @param value
 */
export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {

    if (!isObject(object)) return object;
    if (typeof path !== 'string') throw Error('path must be string');
    let _object = createObjectFromString(path, value)
    return merge(object as Indexed, _object)
}

function createObjectFromString(string: string, value: any) {
    return string.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
}
