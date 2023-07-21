import { Client } from "../deps.js"

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE, } = Deno.env.toObject();
export const client = new Client({
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    hostname: PGHOST,
    port: parseInt(PGPORT),
});