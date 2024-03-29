import { CreateSecret } from '@models/secret/createSecret';

import {
    AreValidValidationFunction,
    ErrorsDictionary,
    IsValidValidationFunction,
    ValidationFunction,
    Validator,
} from '@validators/types';

import { validateTitle } from './secretValidator';

export const isValid: IsValidValidationFunction = function (dataKey, dataValue) {
    if (typeof dataValue === 'string') {
        let validationFunction: ValidationFunction<string> = () => '';

        if (dataKey === 'title') {
            validationFunction = validateTitle;
        } else if (dataKey === 'key') {
            validationFunction = validateKey;
        } else if (dataKey === 'secret') {
            validationFunction = validateSecret;
        }

        return validationFunction(dataValue);
    } else {
        return '';
    }
};

export const areValid: AreValidValidationFunction<CreateSecret> = function (data) {
    const errors: ErrorsDictionary = Object.entries(data).reduce(
        (acc, [k, v]) => Object.assign(acc, { [k]: isValid(k, v) }),
        {}
    );

    // if the secret is empty we want to validate the title only
    if (data.secret.length === 0) {
        errors.key = '';
    } else {
        // else we also want to validate the secret and the encryption key
        if (data.secret.length < 5) {
            errors.secret = 'Secret should not be less than 5 characters.';
        }

        if (data.secret.length > 1000) {
            errors.secret = 'Secret should not be more than 1000 characters long.';
        }

        if (data.key.length < 6 || data.key.length > 64) {
            errors.key = 'Encryption key should be between 6 and 64 characters long.';
        }

        if (data.secret.length > 0 && (data.key.length < 6 || data.key.length > 64)) {
            errors.key = 'Encryption key should be between 6 and 64 characters long.';
        } else {
            errors.key = '';
        }
    }

    return errors;
};

export function validateKey(key: string) {
    if (key.length === 0) {
        return '';
    }

    if (key.length < 6 || key.length > 64) {
        return 'Encryption key should be between 6 and 64 characters long.';
    }

    return '';
}

export function validateSecret(secret: string) {
    if (secret.length === 0) {
        return '';
    }

    if (secret.length < 5) {
        return 'Secret should not be less than 5 characters.';
    }

    if (secret.length > 1000) {
        return 'Secret should not be more than 1000 characters long.';
    }

    return '';
}

export const secretUpdateValidator = { isValid, areValid } as Validator<CreateSecret>;
