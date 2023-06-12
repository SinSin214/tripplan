import * as db  from '../config/database';

export async function queryDatabase(queryString) {
    try {
        let result = await db.dbPool.query(queryString);
        return result.rows;
    }
    catch(err) {
        throw new Error(err)
    }
}