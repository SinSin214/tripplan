'use client';
import { AppContext } from '@/app/[lang]/context/appContext';
import ComponentLoading from '@/app/[lang]/components/ComponentLoading';
import { ThreadProps } from '@/utils/types';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Fragment, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

export default function HighlightPosts() {
	const { requestAPI } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
	let aHighlights: any = [];
	const t = useTranslations();

	useEffect(() => {
		async function getHighlights() {
			try {
				setIsLoading(true);
				const res = await requestAPI('/thread/highlights', 'GET');
				aHighlights = res;
			} catch(err: any) {
			} finally {
				setIsLoading(false);
			}
		}
		getHighlights();
	}, []);

	return (
		<div className='min-h-[50px] w-full'>
			{isLoading ? <ComponentLoading /> :
				<div>
					{aHighlights.map((thread: ThreadProps) => (
						<Card sx={{ maxWidth: 345 }}>
							<CardActionArea>
								<CardMedia
									component="img"
									height="140"
									image="/static/images/cards/contemplative-reptile.jpg"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{thread.title}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{thread.content}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					))}
				</div>
			}
		</div>
	)
}