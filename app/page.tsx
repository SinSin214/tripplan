'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import { VerticalLine } from './components/SmallThings';
import { PostProps } from '@/utils/types';
import PostList from './components/PostList';
import { GetStaticPropsResult } from 'next';

interface Props {
	posts: PostProps[];
  }

export default function Home({posts} : {posts : PostProps[]}) {
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
					<PostList posts={posts} />
				</Box>
			</Box>
		</Box>
	)
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
	const posts = await getActiveProductsWithPrices();
  
	return {
	  props: {
		posts
	  },
	  revalidate: 60
	};
  }