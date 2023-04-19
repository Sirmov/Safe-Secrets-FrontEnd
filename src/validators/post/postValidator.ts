import { Post } from '@models/post/post';

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
        } else if (dataKey === 'text') {
            validationFunction = validateText;
        }

        return validationFunction(dataValue);
    } else {
        return '';
    }
};

export const areValid: AreValidValidationFunction<Post> = function (data) {
    const errors: ErrorsDictionary = Object.entries(data).reduce(
        (acc, [k, v]) => Object.assign(acc, { [k]: isValid(k, v) }),
        {}
    );

    return errors;
};

export function validateTitle(title: string) {
    if (title.length < 3 || title.length > 48) {
        return 'Post title should be between 3 and 48 characters long.';
    }

    return '';
}

export function validateText(secret: string) {
    if (secret.length < 5) {
        return 'Article text should not be less than 5 characters.';
    }

    if (secret.length > 5000) {
        return 'Article text should not be more than 5000 characters long.';
    }

    return '';
}

export const postValidator = { isValid, areValid } as Validator<Post>;
