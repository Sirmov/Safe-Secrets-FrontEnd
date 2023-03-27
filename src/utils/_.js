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
