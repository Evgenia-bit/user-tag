import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config({ path: ".env" });

const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB} = process.env

const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`

const pool = new Pool({connectionString})

export default pool