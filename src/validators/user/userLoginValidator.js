import { validateEmail } from './userSignUpValidator';

export function isValid(dataKey, dataValue) {
    let validationFunction = () => '';

    if (dataKey === 'email') {
        validationFunction = validateEmail;
    }

    return validationFunction(dataValue);
}

export function areValid(data) {
    const errors = Object.entries(data).reduce((acc, [k, v]) => Object.assign(acc, { [k]: isValid(k, v) }), {});

    return errors;
}

export const loginValidator = { isValid, areValid };
