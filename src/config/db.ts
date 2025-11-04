import { Pool } from 'pg';
import dotenv from 'dotenv';

const poolConnection = new Pool({
  // host: process.env.DB_HOST,
  // port: 5432,
  // database: process.env.DB_NAME,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD
  connectionString: process.env.DATABASE_URL
  // se usar SSL em produção, habilite aqui:
  // ssl: { rejectUnauthorized: false }
});

async function connectWithRetry(retries = 5) {
  while (retries) {
    try {
      await poolConnection.query('SELECT 1');
      return poolConnection;
    } catch (err) {
      retries -= 1;
      console.log(`🔁 Tentando reconectar... (${retries} tentativas restantes)`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  throw new Error('❌ Não foi possível conectar ao PostgreSQL');
}

export default connectWithRetry;
