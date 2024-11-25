import 'dotenv/config';
import postgres from 'postgres';

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5433,
  ssl: false,
});

export { sql };