import { SyntheticEvent, useState } from 'react';

import { ErrorsDictionary, Validator } from '@validators/types';

type InputValuesDictionary = {
    [index: string]: string | boolean | number;
};

type InputValuesArray = string[];

function useValidation<T>(values: InputValuesDictionary | InputValuesArray, validator: Validator<T>) {
    const [errors, setErrors] = useState<ErrorsDictionary>(() => {
        if (Array.isArray(values)) {
            return values.reduce((acc, curr) => Object.assign(acc, { [curr]: '' }), {});
        }

        return Object.keys(values).reduce((acc, curr) => Object.assign(acc, { [curr]: '' }), {});
    });

    function handleValidation(event: SyntheticEvent) {
        const inputElement = event.currentTarget as HTMLInputElement;
        const dataKey = inputElement.name;
        const dataValue = inputElement.value;
        const error = validator.isValid(dataKey, dataValue);

        setErrors({ ...errors, [dataKey]: error });
    }

    function isValid(dataKey: string, dataValue: string | boolean | number, updateErrors = true) {
        const error = validator.isValid(dataKey, dataValue);

        if (updateErrors) {
            setErrors({ ...errors, [dataKey]: error });
        }

        return error.length > 0;
    }

    function areValid(data: T, updateErrors = true) {
        const errors = validator.areValid(data);

        if (updateErrors) {
            setErrors(errors);
        }

        return !Object.values(errors).some((e) => e.length > 0);
    }

    return {
        errors,
        setErrors,
        handleValidation,
        isValid,
        areValid,
    };
}

export default useValidation;
