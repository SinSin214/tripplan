import { Pool } from 'pg';

export let dbPool = {};

export async function provideDbPool() {
    let dbConfig = {
        max: 50,
        connectionTimeoutMillis: 10000,
        connectionString: 'postgres://postgres:EHuMLFLypincqRTy@db.vvalxkadpkkajhgddlss.supabase.co:6543/postgres'
    };
    
    dbPool = new Pool(dbConfig);
}
