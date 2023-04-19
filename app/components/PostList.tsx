import { PostProps } from '@/utils/types';
import Image from 'next/image';
import Link from "next/link";

interface Props {
    post: PostProps;
}

export default function PostList({ post }: Props) {
    return (
        <div className="w-2/6 h-72 m-4 rounded overflow-hidden border cursor-pointer hover:bg-slate-100">
            <Link href={`/post/${post.id}`}>
            <Image
                src={post.image_path}
                alt=""
                className="w-full h-36"
                width="0"
                height="0"
                sizes="100vw" />
            <div className="p-3">
                <h3 className="text-xl mb-2">{post.title}</h3>
                <div>
                    {post.content}
                </div>
            </div>
            </Link>
        </div>
    )
}