import { BaseModel } from '@models/types';

export interface Post extends BaseModel {
    title: string;
    text: string;
}
