import connectWithRetry from '../config/db';
import dotenv from 'dotenv';
import { User } from '../model/user.js';
import { hashPassword } from "../utils/auth";

dotenv.config();


class UserService {

    async getAllUsers() {
        const res = await connectWithRetry().then((pool) => {
            return pool.query('SELECT id, nome, email, dt_criacao FROM user_vigia.tb_usuario ORDER BY id');
        });
        return res.rows;
    }

    async getUserById(id: any) {
        const res = await connectWithRetry().then((pool) => {
            return pool.query('SELECT id, nome, email, dt_criacao FROM user_vigia.tb_usuario WHERE id = $1', [id]);
        });
        return res.rows[0] || null;
    }

    async getUserByEmail(email: string) {
        const { rows } = await connectWithRetry().then((pool) => {
            return pool.query('SELECT id, nome, email, password FROM user_vigia.tb_usuario WHERE email = $1', [email]);
        });
        return rows[0] || null;
    }

    async createUser(user: User) {
        if (user && user.password) {
            const hashed = await hashPassword(user.password);
            const { rows } = await connectWithRetry().then((pool) => {
                return pool.query(
                    "INSERT INTO user_vigia.tb_usuario (nome, email, password) VALUES ($1, $2, $3) RETURNING id, nome, email",
                    [user.nome, user.email, hashed]
                );
            });

            return rows[0];
        }
    }

    async updateUser(id: any, user: User) {
        const { rows } = await connectWithRetry().then((pool) => {
            return pool.query(
                "UPDATE user_vigia.tb_usuario SET nome = $1, email = $2 WHERE id = $3 RETURNING *", [user.nome, user.email, id]
            );
        });

        return rows[0] || null;
    }

    async deleteUser(id: any) {
        await connectWithRetry().then((pool) => {
            return pool.query(
                "DELETE FROM user_vigia.tb_usuario WHERE id = $1", [id]
            );
        });

        return true;
    }

}

export default new UserService();