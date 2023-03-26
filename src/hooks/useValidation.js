import { useState } from 'react';

function useValidation(values, validator) {
    const [errors, setErrors] = useState(() => {
        if (Array.isArray(values)) {
            return values.reduce((acc, curr) => Object.assign(acc, { [curr]: '' }), {});
        }

        return Object.keys(values).reduce((acc, curr) => Object.assign(acc, { [curr]: '' }), {});
    });

    function handleValidation(event) {
        const dataKey = event.currentTarget.name;
        const dataValue = event.currentTarget.value;
        const error = validator.isValid(dataKey, dataValue);

        setErrors({ ...errors, [dataKey]: error });
    }

    function isValid(dataKey, dataValue, updateErrors = true) {
        const error = validator.isValid(dataKey, dataValue);

        if (updateErrors) {
            setErrors({ ...errors, [dataKey]: error });
        }

        return error.length > 0;
    }

    function areValid(data, updateErrors = true) {
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
