export function isValid(dataKey, dataValue) {
    let validationFunction = () => '';

    if (dataKey === 'title') {
        validationFunction = validateTitle;
    } else if (dataKey === 'text') {
        validationFunction = validateText;
    }

    return validationFunction(dataValue);
}

export function areValid(data) {
    const errors = Object.entries(data).reduce((acc, [k, v]) => Object.assign(acc, { [k]: isValid(k, v) }), {});

    return errors;
}

export function validateTitle(title) {
    if (title.length < 3 || title.length > 48) {
        return 'Post title should be between 3 and 48 characters long.';
    }

    return '';
}

export function validateText(secret) {
    if (secret.length < 5) {
        return 'Article text should not be less than 5 characters.';
    }

    if (secret.length > 5000) {
        return 'Article text should not be more than 5000 characters long.';
    }

    return '';
}

export const postValidator = { isValid, areValid };
