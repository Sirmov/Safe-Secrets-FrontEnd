import { BaseModel } from '@models/types';

export interface User extends BaseModel {
    username: string;
    email: string;
}
