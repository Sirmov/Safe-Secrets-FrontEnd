import { useState } from 'react';

function useLoading(initialState) {
    const [isLoading, setIsLoading] = useState(initialState || false);

    function watch(func) {
        return async (...args) => {
            setIsLoading(true);

            try {
                await func.apply(this, args);
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
