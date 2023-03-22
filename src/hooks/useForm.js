import { useState } from 'react';

import { stringToBoolean } from '@utils/_';
import { validateData } from '@utils/validation';

function useForm(initialData, onSubmitHandler) {
    const [values, setValues] = useState(initialData);
    const [errors, setErrors] = useState(
        Object.keys(initialData).reduce((acc, curr) => Object.assign(acc, { [curr]: '' }), {})
    );

    function handleChange(event) {
        const dataKey = event.currentTarget.name;
        const dataValue = event.currentTarget.value;

        if (event.currentTarget.type === 'checkbox') {
            setValues({ ...values, [dataKey]: !stringToBoolean(dataValue) });
        } else {
            setValues({ ...values, [dataKey]: dataValue });
        }
    }

    function handleValidation(event) {
        const dataKey = event.currentTarget.name;
        const dataValue = event.currentTarget.value;
        const error = validateData(dataKey, dataValue);

        setErrors({ ...errors, [dataKey]: error });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let errors = Object.entries(values).reduce(
            (acc, [k, v]) => Object.assign(acc, { [k]: validateData(k, v) }),
            {}
        );
        let isValid = !Object.values(errors).some((e) => e.length > 0);

        if (!isValid) {
            setErrors(errors);
        } else {
            if (onSubmitHandler) {
                await onSubmitHandler(event, values);
            }
        }
    }

    return {
        values,
        setValues,
        errors,
        handleChange,
        handleValidation,
        handleSubmit,
    };
}

export default useForm;
