import { useEffect, useState } from 'react';

function useStorage(storage, key, defaultValue) {
    if (typeof window === 'undefined') {
        console.error('Window is not defined. Are you running this code on the client.');
        return defaultValue;
    }

    let usedStorage;

    if (String(storage).toLocaleLowerCase() === 'localstorage') {
        usedStorage = window.localStorage;
    } else if (String(storage).toLocaleLowerCase() === 'sessionstorage') {
        usedStorage = window.sessionStorage;
    }

    const [value, setValue] = useState(() => {
        const saved = usedStorage.getItem(key);

        if (saved !== null) {
            return JSON.parse(saved);
        } else {
            usedStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
    });

    useEffect(() => {
        usedStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useStorage;
