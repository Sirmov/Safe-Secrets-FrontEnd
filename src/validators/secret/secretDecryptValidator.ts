import {
    AreValidValidationFunction,
    ErrorsDictionary,
    IsValidValidationFunction,
    ValidationFunction,
    Validator,
} from '@validators/types';

import { Secret, validateKey } from './secretValidator';

export const isValid: IsValidValidationFunction = function (dataKey, dataValue) {
    if (typeof dataValue === 'string') {
        let validationFunction: ValidationFunction<string> = () => '';

        if (dataKey === 'key') {
            validationFunction = validateKey;
        }

        return validationFunction(dataValue);
    } else {
        return '';
    }
};

export const areValid: AreValidValidationFunction<Secret> = function (data) {
    const errors: ErrorsDictionary = Object.entries(data).reduce(
        (acc, [k, v]) => Object.assign(acc, { [k]: isValid(k, v) }),
        {}
    );

    return errors;
};

export const secretDecryptValidator = { areValid, isValid } as Validator<Secret>;
