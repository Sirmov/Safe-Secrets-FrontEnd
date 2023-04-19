export function stringToBoolean(string?: string) {
    if (!string) {
        return false;
    }

    if (string.toLowerCase() === 'false') {
        return false;
    } else if (string.toLowerCase() === 'true') {
        return true;
    }

    return Boolean(string);
}

export function isStatusOk(status: number) {
    return status < 300;
}

export function isAuthenticated(auth?: { accessToken: 'string' }) {
    return !!auth?.accessToken;
}

export function formatDateLong(unixTimestamp: number) {
    const date = new Date(unixTimestamp);
    return date.toLocaleString();
}

export function formatDateShort(unixTimestamp: number) {
    const date = new Date(unixTimestamp);
    return date.toLocaleDateString();
}

export function debounce(func: (...args: any) => any, timeout = 300) {
    let timer: number;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply({}, args);
        }, timeout);
    };
}

export function isString(variable: any) {
    return typeof variable === 'string' || variable instanceof String;
}
