'use client';
import { Box } from '@mui/material';
import Image from 'next/image';

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
				<Box sx={{ display: 'flex' }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: '33%' }}>
						<label>INSPIRATION</label>
						<text>Discover incredible destinations, exceptional accommodations, and exciting experiences</text>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: '33%' }}>
						<label>INSPIRATION</label>
						<text>Discover incredible destinations, exceptional accommodations, and exciting experiences</text>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: '33%' }}>
						<label>INSPIRATION</label>
						<text>Discover incredible destinations, exceptional accommodations, and exciting experiences</text>
					</Box>
				</Box>
			</div>
		</div>
	)
}
