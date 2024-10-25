import { Pool } from "pg";

const connectionString = process.env.DB_URL!

const pool = new Pool({ connectionString })

export default pool
