/**
 * 简单对象拷贝
 * @param {*} obj 对象
 */
export function copyObj (obj) {
    return JSON.parse(JSON.stringify(obj))
}