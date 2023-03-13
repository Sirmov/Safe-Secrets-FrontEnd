export function stringToBoolean(string) {
    if (string === false || String(string).toLowerCase() === 'false') {
        return false;
    } else if (string === true || String(string).toLowerCase() === 'true') {
        return true;
    }

    return Boolean(string);
}
