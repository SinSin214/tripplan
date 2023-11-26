'use client';
import { AppContext } from '@/app/context/appContext';
import Loading from '@/app/components/Loading';
import { IResponse, PostProps } from '@/utils/types';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Fragment, useContext, useEffect } from 'react';

export default function HighlightPosts() {
	const { requestAPI, isLoading } = useContext(AppContext);
	let aHighlights: any = [];
	useEffect(() => {
		const getHighlights = async () => {
			const res: IResponse = await requestAPI('/post/highlights', 'GET');
			aHighlights = res.data;
		};
		getHighlights();
	}, []);

	if(isLoading) return (<Loading />)

	return (
		<Fragment>
			{aHighlights.map((post: PostProps) => (
				<Card sx={{ maxWidth: 345 }}>
				<CardActionArea>
				  <CardMedia
					component="img"
					height="140"
					image="/static/images/cards/contemplative-reptile.jpg"
				  />
				  <CardContent>
					<Typography gutterBottom variant="h5" component="div">
					  {post.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
					  {post.content}
					</Typography>
				  </CardContent>
				</CardActionArea>
			  </Card>
			))}
			</Fragment>
	)
}