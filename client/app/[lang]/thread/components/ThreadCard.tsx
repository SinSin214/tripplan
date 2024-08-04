import * as React from 'react';
import { Typography } from '@mui/material';
import { IThreadOverviewType } from '@/utils/types';
import { Bookmark } from '@mui/icons-material';
import Image from 'next/image'

export default function ThreadCard(props: { ThreadOverview: IThreadOverviewType, onCardClick: Function }) {
  const thread = props.ThreadOverview;

  return (
    <div className="grid grid-cols-3 h-[200px]">
      	<Image className="col-span-1 mr-4 w-full cursor-pointer"
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
		<div className="col-span-2 grid grid-rows-4 ml-4">
			<div className="flex justify-between row-span-1">
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

			<div className="thread-card-title row-span-1">
					<Typography 
						gutterBottom 
						variant="h5" 
						component="div" 
						style={{
							cursor: "pointer"
						}}
						onClick={() => { alert('aa')}} >
						{thread.title}
					</Typography>
				</div>
			
				<div className="description row-span-1">
					<Typography variant="body2" color="text.secondary">
						{thread.description}
					</Typography>
				</div>
				<div className="row-span-1">
                ab
			</div>
			</div>
    </div>
  );
}