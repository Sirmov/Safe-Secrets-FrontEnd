import { ReactNode, createContext, useContext } from 'react';

import useLocalStorage from '@hooks/useLocalStorage';

interface AuthContextType {
    auth: Nullable<Auth>;
    setAuth?: React.Dispatch<React.SetStateAction<Nullable<Auth>>>;
}

export interface Auth {
    _id: string;
    username: string;
    email: string;
    accessToken: string;
}

export const AuthContext = createContext<AuthContextType>({ auth: null });

export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useLocalStorage<Nullable<Auth>>('auth', null);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}
