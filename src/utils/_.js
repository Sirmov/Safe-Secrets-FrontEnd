export function stringToBoolean(string) {
    if (string === false || String(string).toLowerCase() === 'false') {
        return false;
    } else if (string === true || String(string).toLowerCase() === 'true') {
        return true;
    }

    return Boolean(string);
}

export function isStatusOk(status) {
    return status < 300;
}

export function isAuthenticated(accessToken) {
    return !!accessToken;
}

export function formatDate(unixTimestamp) {
    const date = new Date(unixTimestamp);
    return date.toLocaleString();
}

export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

export function isString(variable) {
    return typeof variable === 'string' || variable instanceof String;
}
