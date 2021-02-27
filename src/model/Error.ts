export interface IError {
    message: string;
    stack?: string;
    extra?: {
        url: string;
        params: object;
    };
}