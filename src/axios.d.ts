import { AxiosResponse as Response } from 'axios';

declare module 'axios' {
    export interface AxiosResponse extends Response {
        isOk: boolean;
    }
}
