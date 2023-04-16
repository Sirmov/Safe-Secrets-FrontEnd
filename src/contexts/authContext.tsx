import React, { ReactNode, useContext } from 'react';

import useLocalStorage from '@hooks/useLocalStorage';

export const AuthContext = React.createContext({});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useLocalStorage('auth', {});

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}
