import React, { useContext } from 'react';

import useLocalStorage from '@hooks/useLocalStorage';

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useLocalStorage('auth', {});

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}
