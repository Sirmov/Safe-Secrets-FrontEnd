import { ChangeEvent, useState } from 'react';

import { stringToBoolean } from '@utils/_';

interface InputValuesDictionary {
    [index: string]: string | boolean | number;
}

interface SubmitHandlerCallback {
    (event: SubmitEvent, data: InputValuesDictionary): void;
}

function useForm(initialData: InputValuesDictionary, onSubmitHandler: SubmitHandlerCallback) {
    const [values, setValues] = useState(initialData);

    function handleChange(event: ChangeEvent): void {
        const inputElement = event.currentTarget as HTMLInputElement;
        const dataKey = inputElement.name;
        const dataValue = inputElement.value;

        if (inputElement.type === 'checkbox') {
            setValues({ ...values, [dataKey]: !stringToBoolean(dataValue) });
        } else {
            setValues({ ...values, [dataKey]: dataValue });
        }
    }

    async function handleSubmit(event: SubmitEvent): Promise<void> {
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
