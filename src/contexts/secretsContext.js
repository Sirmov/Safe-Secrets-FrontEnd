import React, { useContext, useState } from 'react';

export const SecretsContext = React.createContext();

export function SecretsProvider({ children }) {
    const [secrets, setSecrets] = useState(null);

    return <SecretsContext.Provider value={{ secrets, setSecrets }}>{children}</SecretsContext.Provider>;
}

export function useSecretsContext() {
    return useContext(SecretsContext);
}
