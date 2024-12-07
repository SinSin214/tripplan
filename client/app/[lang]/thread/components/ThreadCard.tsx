import * as React from 'react';
import { Typography } from '@mui/material';
import { IThreadOverviewType } from '@/utils/types';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import Image from 'next/image'

export default function ThreadCard(props: { ThreadOverview: IThreadOverviewType, onCardClick: Function, onBookMarkClick: Function }) {
	const thread = props.ThreadOverview;

	const onCardClick = () => {
		props.onCardClick(thread.id);
	}

	const onBookMarkClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		alert('Saved');
		// props.onBookMarkClick(thread.id);
	}

	return (
		<div
			className="flex h-[200px] thread-card-container"
			onClick={(event) => onCardClick()}>
			<Image className="thread-card-image"
				src="/wallpaper.jpg"
				sizes="100vw"
				width={100}
				height={100}
				alt="green iguana"
			/>
			<div className="thread-card-info">
				<div className="flex justify-between">
					<Typography
						variant="body1"
						component="div">
						Type
					</Typography>
					{ thread.bookmarked ? 
						<Bookmark
						style={{
							cursor: "pointer"
						}}
						onClick={(event) => onBookMarkClick(event)} />
						:
						<BookmarkBorder
						style={{
							cursor: "pointer"
						}}
						onClick={(event) => onBookMarkClick(event)} />
					}
				</div>

				<Typography
					className="thread-card-title"
					variant="h5"
					component="div">
					{thread.title}
				</Typography>

				<Typography
					className="thread-card-description"
					variant="body2"
					color="text.secondary"
					component="div">
					{thread.description}
				</Typography>

				<div className="flex justify-between">
					<Typography
						className="thread-card-creator"
						variant="body2"
						color="text.secondary">
						{thread.creator.displayName}
					</Typography>
				</div>
			</div>
		</div>
	);
}