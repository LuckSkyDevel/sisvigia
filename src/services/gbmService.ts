import dotenv from 'dotenv';

import connectWithRetry from "../config/db";
import { Gbm } from "../model/gbm";

dotenv.config();

class GbmService {
    async getAllGbms(): Promise<Gbm[] | []> {
        try {
            const { rows: gbms } = await connectWithRetry().then((pool) => {
                return pool.query<Gbm>(
                    'SELECT gbm_id, nm_gbm, sgl_gbm, dt_criacao, gbm_st_ativo FROM user_vigia.tb_gbm ORDER BY gbm_id'
                );
            });

            return gbms ?? [];
        } catch (error) {
            console.error(`Erro ao buscar GBMs: `, error);
            throw error;
        }
    }

    async getGbmById(id: number): Promise<Gbm | null> {
        try {
            const { rows: gbms } = await connectWithRetry().then((pool) => {
                return pool.query<Gbm>(
                    'SELECT gbm_id, nm_gbm, sgl_gbm, dt_criacao, gbm_st_ativo FROM user_vigia.tb_gbm WHERE gbm_id = $1',
                    [id]
                );
            });

            return gbms[0] ?? null;
        } catch (error) {
            console.error(`Erro ao Buscar GBM com id: ${id} - `, error);
            throw error;
        }
    }

    async getGbmBySigla(sigla: string): Promise<Gbm | null> {
        try {
            const { rows } = await connectWithRetry().then((pool) =>
                pool.query<Gbm>(
                    'SELECT gbm_id, nm_gbm, sgl_gbm, dt_criacao, gbm_st_ativo FROM user_vigia.tb_gbm WHERE sgl_gbm = $1',
                    [sigla]
                )
            );

            return rows[0] ?? null;
        } catch (error) {
            console.error(`Erro ao buscar GBM com sigla: ${sigla} - `, error);
            throw error;
        }
    }

    async createGbm(gbm: Gbm): Promise<Gbm> {
        try {
            const { rows: gbms } = await connectWithRetry().then((pool) =>
                pool.query<Gbm>(
                    'INSERT INTO user_vigia.tb_gbm (nm_gbm, sgl_gbm) VALUES ($1, $2) RETURNING *',
                    [gbm.nm_gbm, gbm.sgl_gbm]
                )
            );

            return gbms[0] ?? null;
        } catch (error) {
            console.error('Erro ao criar GBM: ', error);
            throw error;
        }
    }

    async updateGbm(id: number, gbm: Gbm): Promise<Gbm | null> {
        try {
            const setClauses: string[] = [];
            const values: any[] = [];
            let idx = 1;

            if (gbm) {
                if (gbm.nm_gbm) {
                    setClauses.push(`nm_gbm = $${idx++}`);
                    values.push(gbm.nm_gbm);
                }

                if (gbm.sgl_gbm) {
                    setClauses.push(`sgl_gbm = $${idx++}`);
                    values.push(gbm.sgl_gbm);
                }

                values.push(id);

                const query = `UPDATE user_vigia.tb_gbm SET ${setClauses.join(', ')} WHERE gbm_id = $${idx} RETURNING *`;

                const { rows: gbms } = await connectWithRetry().then((pool) => pool.query<Gbm>(query, values));

                return gbms[0] ?? null;
            } else {
                return null;
            }
        } catch (error) {
            console.error(`Erro ao atualizar GBM com id ${id}: `, error);
            throw error;
        }
    }

    async deleteGbm(id: number): Promise<boolean> {
        try {
            const result = await connectWithRetry().then((pool) =>
                pool.query('UPDATE user_vigia.tb_gbm SET gbm_st_ativo = false WHERE gbm_id = $1', [id])
            );

            return result.rows.length <= 0
        } catch (error) {
            console.error(`Erro ao deletar GBM com id ${id}: `, error);
            throw error;
        }
    }
}

export default new GbmService();