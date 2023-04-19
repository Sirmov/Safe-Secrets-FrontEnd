import { ChangeEvent, FormEvent, useState } from 'react';

import { stringToBoolean } from '@utils/_';

export interface InputValuesDictionary {
    [index: string]: string | boolean | number;
}

interface SubmitHandlerCallback<T> {
    (event: FormEvent<HTMLFormElement>, data: T): void;
}

function useForm<T>(initialData: T, onSubmitHandler: SubmitHandlerCallback<T>) {
    const [values, setValues] = useState(initialData);

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const inputElement = event.currentTarget;
        const dataKey = event.currentTarget.name;
        const dataValue = event.currentTarget.value;

        if (inputElement.type === 'checkbox') {
            setValues({ ...values, [dataKey]: !stringToBoolean(dataValue) });
        } else {
            setValues({ ...values, [dataKey]: dataValue });
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
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
