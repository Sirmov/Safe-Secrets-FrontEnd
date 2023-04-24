import React, { ReactNode, useContext, useState } from 'react';

import { Secret } from '@models/secret/secret';

interface SecretsContextType {
    secrets: Nullable<Secret[]>;
    setSecrets?: React.Dispatch<React.SetStateAction<Nullable<Secret[]>>>;
}

export const SecretsContext = React.createContext<SecretsContextType>({ secrets: null });

export function SecretsProvider({ children }: { children: ReactNode }) {
    const [secrets, setSecrets] = useState<Nullable<Secret[]>>(null);

    return <SecretsContext.Provider value={{ secrets, setSecrets }}>{children}</SecretsContext.Provider>;
}

export function useSecretsContext() {
    return useContext(SecretsContext);
}
