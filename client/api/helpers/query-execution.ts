import * as db  from '../config/database';

export async function queryDatabase(queryString: string) {
    try {
        let result = await db.dbPool.query(queryString);
        return result.rows;
    }
    catch(err: any) {
        throw Error(err)
    }
}