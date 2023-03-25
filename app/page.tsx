'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import { VerticalLine } from './components/SmallThings';

export default function Home() {
	return (
		<div>
			<div>
				<Image
					src="/wallpaper.jpg"
					alt="Picture of the author"
					width="0"
					height="0"
					sizes="100vw"
					className="w-full h-auto"
				/>
			</div>
			<div className="limited-width-layout__content">
				<Box className="flex justify-between">
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
			</div>
		</div>
	)
}
