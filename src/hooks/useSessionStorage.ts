import useStorage, { StorageType } from '@hooks/useStorage';

function useSessionStorage<T>(key: string, defaultValue: T) {
    return useStorage(StorageType.SessionStorage, key, defaultValue);
}

export default useSessionStorage;
