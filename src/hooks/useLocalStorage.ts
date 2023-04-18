import useStorage, { StorageType } from '@hooks/useStorage';

function useLocalStorage<T>(key: string, defaultValue: T) {
    return useStorage(StorageType.LocalStorage, key, defaultValue);
}

export default useLocalStorage;
