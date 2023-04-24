import { BaseModel } from '@models/types';

export interface Secret extends BaseModel {
    title: string;
    secret: string;
}
