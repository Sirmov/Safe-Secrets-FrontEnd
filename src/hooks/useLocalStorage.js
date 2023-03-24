import useStorage from '@hooks/useStorage';

function useLocalStorage(key, defaultValue) {
    return useStorage('localStorage', key, defaultValue);
}

export default useLocalStorage;
