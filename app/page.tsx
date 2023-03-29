'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import { VerticalLine } from './components/SmallThings';
import { PostProps } from '@/utils/types';
import PostList from './components/PostList';


export default async function Home() {
	const posts = await getServerSideProps();
	return (
		<Box>
			<Image
				src="/wallpaper.jpg"
				alt="Picture of the author"
				width="0"
				height="0"
				sizes="100vw"
				className="w-full h-auto vertical-stack-layout"
				priority
			/>
			<Box className="limited-width-layout__content">
				<Box className="flex justify-between vertical-stack-layout">
					<Box className="flex flex-col w-full ">
						<label>INSPIRATION</label>
						<text>Discover incredible destinations, exceptional accommodations, and exciting experiences</text>
					</Box>
					<VerticalLine />
					<Box className="flex flex-col w-full">
						<label>INSPIRATION</label>
						<text>Discover incredible destinations, exceptional accommodations, and exciting experiences</text>
					</Box>
					<VerticalLine />
					<Box className="flex flex-col w-full">
						<label>INSPIRATION</label>
						<text>Discover incredible destinations, exceptional accommodations, and exciting experiences</text>
					</Box>
				</Box>
				<Box className="w-100 text-center vertical-stack-layout">
					<text className="text-xl">DISCOVERY NEW PLACES</text>
				</Box>
				<Box className="flex justify-between vertical-stack-layout">
					aaa
					<PostList posts={posts} />
				</Box>
			</Box>
		</Box>
	)
}

export async function getServerSideProps() {
	const posts: PostProps[] = await getPosts();
  
	return {
	  props: { posts }
	};
}

async function getPosts() {
	let posts = [
		{
			id: '1',
			imageUrl: '/wallpaper.jpg',
			content: 'Content 1',
			title: 'Title 1'
		},
		{
			id: '2',
			imageUrl: '/wallpaper.jpg',
			content: 'Content 2',
			title: 'Title 2'
		},
		{
			id: '3',
			imageUrl: '/wallpaper.jpg',
			content: 'Content 3',
			title: 'Title 3'
		}
	]
	await setTimeout(() => {}, 2000)
	return posts;
}