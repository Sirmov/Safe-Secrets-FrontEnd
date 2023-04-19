import { useEffect, useState } from 'react';

export enum StorageType {
    LocalStorage,
    SessionStorage,
}

function useStorage<T>(
    storage: StorageType,
    key: string,
    defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    if (typeof window === 'undefined') {
        throw new Error('Window is not defined. Are you running this code on the client.');
    }

    let usedStorage: Storage;

    if (storage === StorageType.LocalStorage) {
        usedStorage = window.localStorage;
    } else if (storage === StorageType.SessionStorage) {
        usedStorage = window.sessionStorage;
    }

    const [value, setValue] = useState<T>((): T => {
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
