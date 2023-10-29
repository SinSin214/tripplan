'use client';
import Image from 'next/image';
import { VerticalLine } from './components/SmallThings';
import { PostProps } from '@/utils/types';
import PostList from './components/PostList';
import * as API from '../utils/apiHelper';
import { Fragment } from 'react';

export default async function Home() {
	const aPosts = await API.request('/post/all', 'GET');

	return (
		<Fragment>
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
						<div>Discover incredible destinations, exceptional accommodations, and exciting experiences</div>
					</div>
					<VerticalLine />
					<div className="flex flex-col w-full">
						<label>INSPIRATION</label>
						<div>Discover incredible destinations, exceptional accommodations, and exciting experiences</div>
					</div>
					<VerticalLine />
					<div className="flex flex-col w-full">
						<label>INSPIRATION</label>
						<div>Discover incredible destinations, exceptional accommodations, and exciting experiences</div>
					</div>
				</div>
				<div className="w-100 text-center vertical-stack-layout">
					<div className="text-xl">DISCOVERY NEW PLACES</div>
				</div>
				<div className="flex justify-between vertical-stack-layout">
					{aPosts ? aPosts.map((post: PostProps) => (
						<PostList post={post} key={post.id} />
					)) : ''}
				</div>
			</div>
		</Fragment>
	)
}