import { FocusEvent, useState } from 'react';

import { ErrorsDictionary, Validator } from '@validators/types';

function useValidation<T extends object>(values: T, validator: Validator<T>) {
    const [errors, setErrors] = useState<ErrorsDictionary>(() => {
        return Object.keys(values).reduce((acc, curr) => Object.assign(acc, { [curr]: '' }), {});
    });

    function handleValidation(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const inputElement = event.currentTarget as HTMLInputElement | HTMLTextAreaElement;
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
