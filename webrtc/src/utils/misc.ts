export function checkNameRoom(room = "", name = "") {
    let message = "";
    let status = true;
    if (!room && !name) {
        message = "room and name both are not provided"
        status = false
    } else if (!room) {
        message = "room is not provided"
        status = false
    } else if (!name) {
        message = "name is not provided"
        status = false
    }
    return { status, message }
}

export async function asyncForEach(arr: Array<any>, callback: Function) {
    for (let i = 0; i < arr.length; i++) {
        await callback(arr[i], i, arr);
    }
}

export function toJson(data: object) {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
        .replace(/"(-?\d+)n"/g, (_, a) => a);
}