import { Context } from './Context';
declare class NycOpenDataError extends Error {
    isNycOpenDataError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { NycOpenDataError };
