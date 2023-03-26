import { useState } from 'react';

import { stringToBoolean } from '@utils/_';

function useForm(initialData, onSubmitHandler) {
    const [values, setValues] = useState(initialData);

    function handleChange(event) {
        const dataKey = event.currentTarget.name;
        const dataValue = event.currentTarget.value;

        if (event.currentTarget.type === 'checkbox') {
            setValues({ ...values, [dataKey]: !stringToBoolean(dataValue) });
        } else {
            setValues({ ...values, [dataKey]: dataValue });
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (onSubmitHandler) {
            await onSubmitHandler(event, values);
        }
    }

    return {
        values,
        setValues,
        handleChange,
        handleSubmit,
    };
}

export default useForm;
