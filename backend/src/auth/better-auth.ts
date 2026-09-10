import { betterAuth } from 'better-auth';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 3306,
  user: process.env.DATABASE_USER || 'trampo_user',
  password: process.env.DATABASE_PASSWORD || 'trampo_password',
  database: process.env.DATABASE_NAME || 'trampocerto',
});

export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET || 'trampo_certo_jwt_secret_dev_key_987654321',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:4000',
  trustedOrigins: [process.env.FRONTEND_URL || 'http://localhost:3000'],
  emailAndPassword: {
    enabled: true,
  },
});
