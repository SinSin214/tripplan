import * as database  from '../config/database';

export async function getPostDetail(id: string) {
    // let dbPool = database.dbPool.query();
    const posts = [
        {
            id: '1',
            imageUrl: '/wallpaper.jpg',
            content: 'Content 1',
            title: 'Title 1',
            createdAt: 2023,
            createdBy: 'Kha'
        },
        {
            id: '2',
            imageUrl: '/wallpaper.jpg',
            content: 'Content 2',
            title: 'Title 2',
            createdAt: 2023,
            createdBy: 'Kha'
        },
        {
            id: '3',
            imageUrl: '/wallpaper.jpg',
            content: 'Content 3',
            title: 'Title 3',
            createdAt: 2023,
            createdBy: 'Kha'
        }
    ];

    await setTimeout(() => {}, 2000);

    return posts.filter(e => e.id === id);
}