import { Response } from "express";

type TMeta = {
    totalPage: number;
    currentPage: number;
    limit: number;
    total: number;
}

export type TResponseData<T> = {
    success: boolean;
    statusCode: number;
    message: String;
    meta?: TMeta;
    data?: T | null | undefined
}


export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        meta: data.meta,
        data: data.data || undefined || null,
    })
}