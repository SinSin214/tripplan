import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, IconButton } from '@mui/material';
import { IThreadOverviewType } from '@/utils/types';
import { Bookmark, MoreHoriz } from '@mui/icons-material';

export default function ThreadCard(props: { ThreadOverview: IThreadOverviewType, onCardClick: Function }) {
  return (
    <Card className="w-full h-[200px] my-4 border-slate-300 border-solid border">
      <div className="min-h-[40px] threadcard-toolbar">
        <div>

        </div>
        <div className="float-right">
          <IconButton>
            <Bookmark />
          </IconButton>
          <IconButton>
            <MoreHoriz />
          </IconButton>
          </div>
      </div>
      <CardActionArea 
        className="grid grid-cols-3 min-h-[210px]"
        onClick={() => props.onCardClick(props.ThreadOverview.id)}>
        <CardMedia className="col-span-1 h-full"
          component="img"
          image="/wallpaper.jpg"
          alt="green iguana"
        />
        <CardContent className="col-span-2 h-full px-6 py-4">
          <Typography gutterBottom variant="h5" component="div">
            {props.ThreadOverview.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.ThreadOverview.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}