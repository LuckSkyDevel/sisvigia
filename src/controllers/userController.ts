import { User } from "../model/user";
import userService from "../services/userService";
import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/responses";

// Utility function to handle responses in a standardized way
// Interfaces for request params, request bodies and user shape
interface UserChanged {
    nome: string;
    email: string;
}


export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users: User[] = await userService.getAllUsers();
        handleResponse(res, 200, "A consulta retornou todos os usuários com sucesso!", users);
    } catch (error) {
        next(error);
    }
};


export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
        const user: User | null = await userService.getUserById(id);
        handleResponse(res, 200, "Usuário encontrado com sucesso!", user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const userChanged: UserChanged = req.body;

    try {
        const user: User | null = await userService.updateUser(id, userChanged);

        if (user || (Array.isArray(user) && user === null)) {
            return handleResponse(res, 404, "Usuário não encontrado" );
        }

        handleResponse(res, 200, "Usuário atualizado com sucesso!", user);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
        await userService.deleteUser(id);

        handleResponse(res, 200, "Usuário excluído com sucesso!");
    } catch (error) {
        next(error);
    }
}

export default handleResponse;