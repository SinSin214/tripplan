import { ResponseStatus } from "types/globalTypes";

export const throwCustomError = (params: {messageCode?: string, status?: ResponseStatus, data?: any}) => {
    throw new Error(JSON.stringify(params));
}