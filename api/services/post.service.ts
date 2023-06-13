import * as helper from '../helpers/database';

export async function getDetail(id) {
    let queryString = `SELECT pos.*, img.image_path FROM posts pos LEFT JOIN images img ON img.mapping_id = pos.id WHERE id = '` + id + "'";

    return helper.queryDatabase(queryString);
}

export async function getAll() {
    let queryString = `SELECT po.*, im.image_path FROM posts po LEFT JOIN images im ON po.id = im.mapping_id`;

    return helper.queryDatabase(queryString);
}