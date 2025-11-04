import { Response } from "express";

// Utility function to handle responses in a standardized way
export const handleResponse = (res: Response, status: number, message: string, data?: any): void => {
    res.status(status).json({
        status,
        message,
        data
    });
};