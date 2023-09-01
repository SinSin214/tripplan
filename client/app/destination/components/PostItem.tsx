'use client'
import Image from 'next/image';
import Link from 'next/link';


export default function PostItem ({ post }: any) {
    // console.log(post);
    return (
        <Link href={`/post/${post.id}`}>
            <div className="grid grid-cols-4 h-40 my-4 p-3 rounded clickable-post">
                <div className="col-span-1">
                    <Image
                        src="/wallpaper.jpg"
                        alt="Picture of the author"
                        width="100"
                        height="100"
                        className="w-full h-full"
                        priority
                    />
                </div>
                <div className="col-span-3 ml-8">
                    <div className="text-2xl">{post.title}</div>
                    <p className="truncate-4">{post.description}</p>
                </div>
            </div>
            </Link>
    )
}
