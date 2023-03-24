import { stringToBoolean } from '@utils/_';

export function validateData(dataKey, dataValue) {
    let validationFunction = () => '';

    if (dataKey === 'email') {
        validationFunction = validateEmail;
    } else if (dataKey === 'password') {
        validationFunction = validatePassword;
    } else if (dataKey === 'username') {
        validationFunction = validateUsername;
    } else if (dataKey === 'terms') {
        validationFunction = validateTerms;
    } else if (dataKey === 'title') {
        validationFunction = validateTitle;
    } else if (dataKey === 'key') {
        validationFunction = validateKey;
    } else if (dataKey === 'text') {
        validationFunction = validateSecret;
    }

    return validationFunction(dataValue);
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

    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) === false) {
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
