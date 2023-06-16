import { prisma } from '../config/database';

export async function getDetail(id: string) {
    // let queryString = `SELECT pos.*, img.image_path FROM posts pos LEFT JOIN images img ON img.mapping_id = pos.id WHERE id = '` + id + "'";
    let result = prisma.post.findUnique({
        include: {
            images: true
        },
        where: {
            id: id
        }
    });
    return result;
}

export async function getAll() {
    // let queryString = `SELECT po.*, im.image_path FROM posts po LEFT JOIN images im ON po.id = im.mapping_id`;

    // return helper.queryDatabase(queryString);
    let result = prisma.post.findMany({
        include: {
            images: true
        }
    });
    return result;
}

export async function createPost(post: any, username: string) {
    let result = prisma.post.create({
        data: {
            title: post.title,
            description: post.description,
            content: post.content,
            highlights: post.highlights,
            author: username,
            rating: post.rating,
            images: {
                create: post.images
            },
            main_image: {
                create: post.main_image
            },
        }
    });
    return result;
}