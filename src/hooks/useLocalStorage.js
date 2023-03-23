import useStorage from '@hooks/useStorage';

let isAdded = false;

function handleLocalStorageChange(key, defaultValue) {
    return function (event) {
        if (event.key === key) {
        }
    };
}

function useLocalStorage(key, defaultValue) {
    if (typeof window !== 'undefined' && !isAdded) {
        window.addEventListener('storage', handleLocalStorageChange(key, defaultValue));
        isAdded = true;
    }

    return useStorage('localStorage', key, defaultValue);
}

export default useLocalStorage;
