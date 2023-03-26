import { validateKey } from './secretValidator';

export function isValid(dataKey, dataValue) {
    let validationFunction = () => '';

    if (dataKey === 'key') {
        validationFunction = validateKey;
    }

    return validationFunction(dataValue);
}

export function areValid(data) {
    const errors = Object.entries(data).reduce((acc, [k, v]) => Object.assign(acc, { [k]: isValid(k, v) }), {});

    return errors;
}

export const secretDecryptValidator = { areValid, isValid };
