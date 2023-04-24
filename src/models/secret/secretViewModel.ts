import { Secret } from './secret';

export interface SecretViewModel extends Secret {
    isEncrypted: boolean;
    decryptedSecret: string;
}
