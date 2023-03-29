import { PostProps } from '@/utils/types';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';

export default function PostList(posts : PostProps[]) {
    console.log('aaa')
    return (
        <div>
            {posts.map((post) => (
                <Card sx={{ maxWidth: 345 }} key={post.id}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200"
                            image={post.imageUrl}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {post.title}
                            </Typography>
                            <Typography variant="body2">
                                {post.content}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    )
}