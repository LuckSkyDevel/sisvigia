import { NextFunction, Request, Response } from "express";
import { Gbm } from "../model/gbm";
import gbmService from "../services/gbmService";
import { handleResponse } from '../utils/responses';


/**
 *  Get All GBMs Actives on Database!
 */
export const getAllGbms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const gbms: Gbm[] = await gbmService.getAllGbms();
        handleResponse(res, 200, "A consulta retornou todos os GBMs com sucesso!", gbms);
    } catch (error) {
        next(error);
    }
}


/**
 *  Get Gbm by your unique identifier!
 * @param req id 
 */
export const getGbmById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
        const gbm = await gbmService.getGbmById(+id);
        handleResponse(res, 200, "A consulta retornou todos os GBMs com sucesso!", gbm);
    } catch (error) {
        next(error);
    }
}


/**
 * Get GBM by sigla in Database!
 * @param req sgl_gbm
 */
export const getGbmBySigla = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { sigla } = req.params;

    try {
        const gbm = await gbmService.getGbmBySigla(sigla);
        handleResponse(res, 200, "A consulta retornou todos os GBMs com sucesso!", gbm);
    } catch (error) {
        next(error);
    }
}


/**
 *  Create a GBM!
 */
export const createGbm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const newGbm: Gbm = req.body;

    try {
        if (newGbm) {
            if (!newGbm.nm_gbm || !newGbm.sgl_gbm) {
                return handleResponse(res, 500, 'Não foi possível inserir o GBM! Dados Obrigatórios não informados!', null);
            }

            const gbm = await gbmService.getGbmBySigla(newGbm.sgl_gbm);

            if (gbm !== null) {
                return handleResponse(res, 500, 'Não foi possível inserir o GBM! Registro já cadastrado!', null);
            }
        }

        const result = await gbmService.createGbm(newGbm);
        handleResponse(res, 200, 'GBM Cadastrado com sucesso!', result);
    } catch (error) {
        throw error;
    }
}


/**
 *  Update GBM for id!
 * @param req id, nm_gbm, sgl_gbm
 */
export const updateGbm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const gbm: Gbm = req.body;

    if (gbm && (!gbm.nm_gbm || !gbm.sgl_gbm)) {
        return handleResponse(res, 500, 'Não é possível atualizar o GBM!\n\n Dados Obrigatórios não preenchidos!', null);
    }

    try {
        if (!Number(id)) {
            return handleResponse(res, 500, 'Não foi possível atualizar o GBM!\n\n Dados Obrigatórios não preenchidos!', null);
        }

        const result = await gbmService.updateGbm(+id, gbm);
        handleResponse(res, 200, 'GBM Atualizado com sucesso!', result);
    } catch (error) {
        throw error;
    }
}


/**
 * Update Status GBM to inactive
 * @param req id
 */
export const deleteGbm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    try {
        if (!Number(id)) {
            return handleResponse(res, 500, 'Não foi possível atualizar o GBM!\n\n Dados Obrigatórios não preenchidos!', null);
        }

        const result = await gbmService.deleteGbm(+id);
        handleResponse(res, 200, 'GBM inativado com sucesso!', result);
    } catch (error) {
        throw error;
    }
}