export function isValid(dataKey, dataValue) {
    let validationFunction = () => '';

    if (dataKey === 'title') {
        validationFunction = validateTitle;
    } else if (dataKey === 'key') {
        validationFunction = validateKey;
    } else if (dataKey === 'text') {
        validationFunction = validateSecret;
    }

    return validationFunction(dataValue);
}

export function areValid(data) {
    const errors = Object.entries(data).reduce((acc, [k, v]) => Object.assign(acc, { [k]: isValid(k, v) }), {});

    return errors;
}

export function validateTitle(title) {
    if (title.length < 3 || title.length > 16) {
        return 'Secret title should be between 3 and 16 characters long.';
    }

    return '';
}

export function validateKey(key) {
    if (key.length < 6 || key.length > 64) {
        return 'Encryption key should be between 6 and 64 characters long.';
    }

    return '';
}

export function validateSecret(secret) {
    if (secret.length < 5) {
        return 'Secret should not be less than 5 characters.';
    }

    if (secret.length > 1000) {
        return 'Secret should not be more than 1000 characters long.';
    }

    return '';
}

export const secretValidator = { isValid, areValid };
