import * as React from 'react';
import { Typography } from '@mui/material';
import { IThreadOverviewType } from '@/utils/types';
import { Bookmark } from '@mui/icons-material';
import Image from 'next/image'

export default function ThreadCard(props: { ThreadOverview: IThreadOverviewType, onCardClick: Function }) {
  let thread = props.ThreadOverview;

  return (
    <div className="grid grid-cols-3 h-[200px]">
      	<Image className="col-span-1 w-full cursor-pointer"
          	src="/wallpaper.jpg"
            width={100}
            height={100}
            sizes="100vw"
            style={{ 
              objectFit: "cover",
			  height: "inherit"
            }}
          	alt="green iguana"
			onClick={() => props.onCardClick(thread.id)}
        	/>
      	<div className="col-span-2 grid grid-rows-5 ml-5">
			<div className="header flex justify-between items-center row-span-1">
				<div className="type">
					Type
				</div>
				<div>
					<Bookmark
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={() => { alert('aa')}} />
				</div>
			</div>
			<div className="body grid items-center row-span-3">
				<div className="thread-card-title">
				<Typography 
                    gutterBottom 
                    variant="h5" 
                    component="div" 
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={() => { alert('aa')}}>
					{thread.title}
				</Typography>
				</div>
				<div className="description">
				<Typography variant="body2" color="text.secondary">
					{thread.description}
				</Typography>
				</div>
			</div>
			<div className="footer flex items-center row-span-1">
                <div>{thread.author}</div>
			</div>
      	</div>
    </div>
  );
}