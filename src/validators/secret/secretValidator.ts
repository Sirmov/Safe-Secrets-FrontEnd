import { CreateSecret } from '@models/secret/createSecret';

import {
    AreValidValidationFunction,
    ErrorsDictionary,
    IsValidValidationFunction,
    ValidationFunction,
    Validator,
} from '@validators/types';

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

    return errors;
};

export const validateTitle: ValidationFunction<string> = function (title) {
    if (title.length < 3 || title.length > 16) {
        return 'Secret title should be between 3 and 16 characters long.';
    }

    return '';
};

export const validateKey: ValidationFunction<string> = function (key) {
    if (key.length < 6 || key.length > 64) {
        return 'Encryption key should be between 6 and 64 characters long.';
    }

    return '';
};

export const validateSecret: ValidationFunction<string> = function (secret) {
    if (secret.length < 5) {
        return 'Secret should not be less than 5 characters.';
    }

    if (secret.length > 1000) {
        return 'Secret should not be more than 1000 characters long.';
    }

    return '';
};

export const secretValidator = { isValid, areValid } as Validator<CreateSecret>;
