import { LoginUser } from '@models/user/loginUser';

import {
    AreValidValidationFunction,
    ErrorsDictionary,
    IsValidValidationFunction,
    ValidationFunction,
    Validator,
} from '@validators/types';

import { validateEmail } from './userSignUpValidator';

export const isValid: IsValidValidationFunction = function (dataKey, dataValue) {
    if (typeof dataValue === 'string') {
        let validationFunction: ValidationFunction<string> = () => '';

        if (dataKey === 'email') {
            validationFunction = validateEmail;
        }

        return validationFunction(dataValue);
    } else {
        return '';
    }
};

export const areValid: AreValidValidationFunction<LoginUser> = function (data) {
    const errors: ErrorsDictionary = Object.entries(data).reduce(
        (acc, [k, v]) => Object.assign(acc, { [k]: isValid(k, v) }),
        {}
    );

    return errors;
};

export const loginValidator = { isValid, areValid } as Validator<LoginUser>;
