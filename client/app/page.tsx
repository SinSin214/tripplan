import Image from 'next/image';
import HighlightThreads from './components/Homepage/HighlightThreads';
import { Fragment } from 'react';
import { VerticalLine } from './components/SmallThings';

export default function Home() {
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
			<div className="lg-limited-width-layout__content">
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
					<HighlightThreads />
				</div>
			</div>
		</Fragment>
	)
}