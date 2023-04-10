import { PostProps } from "@/utils/types";

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
]

export async function getPosts(): Promise<PostProps[]> {
	let overviewPosts = posts;
	await setTimeout(() => {}, 2000)
	return overviewPosts;
}

export async function getPostById(id: string): Promise<PostProps | undefined> {
    let postDetail = posts.find(item => item.id === id);
    await setTimeout(() => {}, 2000);
    return postDetail;
}