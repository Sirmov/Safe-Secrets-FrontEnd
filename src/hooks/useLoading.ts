import { useState } from 'react';

function useLoading(initialState?: boolean) {
    const [isLoading, setIsLoading] = useState(initialState || false);

    function watch(func: (...args: any) => any) {
        return async function (...args: any) {
            setIsLoading(true);

            try {
                await func.apply({}, args);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                throw error;
            }
        };
    }

    function startLoading() {
        setIsLoading(true);
    }

    function stopLoading() {
        setIsLoading(false);
    }

    return { isLoading, watch, startLoading, stopLoading };
}

export default useLoading;
