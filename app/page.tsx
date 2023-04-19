import Image from 'next/image';
import { VerticalLine } from './components/SmallThings';
import { PostProps } from '@/utils/types';
import PostList from './components/PostList';
import * as API from '../utils/apiHelper';

export default async function Home() {
	const posts = await getServerSideProps();

	return (
		<div>
			<Image
				src="/wallpaper.jpg"
				alt="Picture of the author"
				width="0"
				height="0"
				sizes="100vw"
				className="w-full h-auto vertical-stack-layout"
				priority
			/>
			<div className="limited-width-layout__content">
				<div className="flex justify-between vertical-stack-layout">
					<div className="flex flex-col w-full ">
						<label>INSPIRATION</label>
						<text>Discover incredible destinations, exceptional accommodations, and exciting experiences</text>
					</div>
					<VerticalLine />
					<div className="flex flex-col w-full">
						<label>INSPIRATION</label>
						<text>Discover incredible destinations, exceptional accommodations, and exciting experiences</text>
					</div>
					<VerticalLine />
					<div className="flex flex-col w-full">
						<label>INSPIRATION</label>
						<text>Discover incredible destinations, exceptional accommodations, and exciting experiences</text>
					</div>
				</div>
				<div className="w-100 text-center vertical-stack-layout">
					<text className="text-xl">DISCOVERY NEW PLACES</text>
				</div>
				<div className="flex justify-between vertical-stack-layout">
					{posts ? posts.map((post) => (
						<PostList post={post} key={post.id} />
					)) : ''}
				</div>
			</div>
		</div>
	)
}

async function getServerSideProps() {
	const posts: PostProps[] = await API.getPosts();
	return posts;
}