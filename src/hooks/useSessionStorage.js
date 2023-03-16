import useStorage from '@hooks/useStorage';

function useSessionStorage(key, defaultValue) {
    return useStorage('sessionStorage', key, defaultValue);
}

export default useSessionStorage;
