
import { Perfil } from '../model/perfil';
import connectWithRetry from '../config/db';

class PerfilService {
    async getAllPerfis(): Promise<Perfil[] | []> {
        try {
            const { rows: perfis } = await connectWithRetry().then((pool) => {
                return pool.query<Perfil>(
                    'SELECT cod_perfil, nom_perfil, sgl_perfil, st_perfil_ativo, cod_perfil_pai, dt_inclusao FROM user_vigia.tb_perfil ORDER BY cod_perfil'
                );
            });

            return perfis ?? [];
        } catch (error) {
            console.error(`Erro ao buscar Perfis: `, error);
            throw error;
        }
    }

    async getPerfilById(codPerfil: number): Promise<Perfil | null> {
        try {
            const { rows: perfis } = await connectWithRetry().then((pool) => {
                return pool.query<Perfil>(
                    'SELECT cod_perfil, nom_perfil, sgl_perfil, st_perfil_ativo, cod_perfil_pai, dt_inclusao FROM user_vigia.tb_perfil WHERE cod_perfil = $1',
                    [codPerfil]
                );
            });

            return perfis[0] ?? null;
        } catch (error) {
            console.error(`Erro ao Buscar Perfil com id: ${codPerfil} - `, error);
            throw error;
        }
    }

    async createPerfil(perfil: Perfil): Promise<Perfil> {
        try {
            const { rows: perfis } = await connectWithRetry().then((pool) =>
                pool.query<Perfil>(
                    'INSERT INTO user_vigia.tb_perfil (nom_perfil, sgl_perfil, st_perfil_ativo, cod_perfil_pai) VALUES ($1, $2, $3, $4) RETURNING *',
                    [perfil.nomPerfil, perfil.sglPerfil, perfil.stPerfilAtivo, perfil.codPerfilPai]
                )
            );

            return perfis[0];
        } catch (error) {
            console.error(`Erro ao criar Perfil: `, error);
            throw error;
        }
    }

    async deletePerfil(codPerfil: number): Promise<Perfil | null> {
        try {
            const { rows: perfis } = await connectWithRetry().then((pool) =>
                pool.query<Perfil>(
                    'UPDATE user_vigia.tb_perfil SET st_perfil_ativo = false WHERE cod_perfil = $1 RETURNING *',
                    [codPerfil]
                )
            );

            return perfis[0] ?? null;
        } catch (error) {
            console.error(`Erro ao inativar Perfil com id: ${codPerfil} - `, error);
            throw error;
        }
    }
}

export default new PerfilService();