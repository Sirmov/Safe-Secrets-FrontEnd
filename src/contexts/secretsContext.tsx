import { ReactNode, createContext, useContext, useState } from 'react';

import { SecretViewModel } from '@models/secret/secretViewModel';

interface SecretsContextType {
    secrets: Nullable<SecretViewModel[]>;
    setSecrets?: React.Dispatch<React.SetStateAction<Nullable<SecretViewModel[]>>>;
}

export const SecretsContext = createContext<SecretsContextType>({ secrets: null });

export function SecretsProvider({ children }: { children: ReactNode }) {
    const [secrets, setSecrets] = useState<Nullable<SecretViewModel[]>>(null);

    return <SecretsContext.Provider value={{ secrets, setSecrets }}>{children}</SecretsContext.Provider>;
}

export function useSecretsContext() {
    return useContext(SecretsContext);
}
