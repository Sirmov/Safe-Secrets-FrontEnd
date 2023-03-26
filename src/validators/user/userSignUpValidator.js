import { stringToBoolean } from '@utils/_';

export function isValid(dataKey, dataValue) {
    let validationFunction = () => '';

    if (dataKey === 'email') {
        validationFunction = validateEmail;
    } else if (dataKey === 'password') {
        validationFunction = validatePassword;
    } else if (dataKey === 'username') {
        validationFunction = validateUsername;
    } else if (dataKey === 'terms') {
        validationFunction = validateTerms;
    }

    return validationFunction(dataValue);
}

export function areValid(data) {
    const errors = Object.entries(data).reduce((acc, [k, v]) => Object.assign(acc, { [k]: isValid(k, v) }), {});

    return errors;
}

export function validateUsername(username) {
    const errors = [];

    if (username.length < 3 || username.length > 16) {
        errors.push('Username length should be between 3 and 16 characters.');
    } else if (/^[a-zA-Z0-9]+$/.test(username) === false) {
        errors.push('Username should not contains special characters.');
    }

    return errors.join(' ');
}

export function validateEmail(email) {
    const errors = [];

    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) === false) {
        errors.push('Email is invalid.');
    }

    return errors.join(' ');
}

export function validatePassword(password) {
    const errors = [];

    if (password.length < 8 || password.length > 32) {
        errors.push('Password length should be between 8 and 32 characters long.');
    } else if (/\d/.test(password) === false) {
        errors.push('Password should include at least one number.');
    } else if (/[A-Z]/.test(password) === false) {
        errors.push('Password should include at least one uppercase character.');
    }

    return errors.join(' ');
}

export function validateTerms(terms) {
    if (stringToBoolean(terms) == false) {
        return 'You should accept the terms and policy.';
    }

    return '';
}

export const signUpValidator = { isValid, areValid };
