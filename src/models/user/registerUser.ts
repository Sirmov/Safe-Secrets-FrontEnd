import { LoginUser } from './loginUser';

export interface RegisterUser extends LoginUser {
    username: string;
    terms: boolean;
}
