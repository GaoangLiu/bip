export function decode(arrayBuffer) {
    return new TextDecoder().decode(arrayBuffer)
}

export class WorkerError extends Error {
    constructor(statusCode, ...params) {
        super(...params)
        this.statusCode = statusCode
    }
}

export function genRandStr(len) {
    // TODO: switch to Web Crypto random generator
    let str = ""
    const numOfRand = params.CHAR_GEN.length
    for (let i = 0; i < len; i++) {
        str += params.CHAR_GEN.charAt(Math.floor(Math.random() * numOfRand))
    }
    return str
}


export async function logMap(contentMap) {
    const message = contentMap.message || '';
    const level = contentMap.level || 'INFO';
    const application = contentMap.application || 'cf.worker.cudo.cc';
    const source = contentMap.source || 'CF-ALERT';
    const API = contentMap.api;
    if (!API) {
        throw new WorkerError(400, "API not provided")
    }

    return await fetch(
        API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer cflogging",
        },
        body: JSON.stringify({
            message,
            level,
            application,
            source,
        }),
    }
    )
}
