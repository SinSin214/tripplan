'use client';
import Image from 'next/image';
import { AppContext } from '@/app/context/appContext';
import Rating from '@mui/material/Rating';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '@/app/loading';
// import { Booking } from '../components/Booking';

interface IPostDetail {
    title: string,
    content: string
}

export default function PostDetail({ params }: { params: { id: string } }) {
    const { requestAPI } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [postDetail, setPostDetail] = useState<any>({
        title: 'ok',
        content: 'okkk'
    });
    useEffect(() => {
        async function getPost() {
            try {
                setIsLoading(true);
                const res = await requestAPI(`/post/${params.id}`, 'GET');
                setPostDetail(res);
                setIsLoading(false);
            } catch(err: any) {
                setIsLoading(false);
                toast.error(err.response.data.message);
            }
        };
        getPost();
    }, [])
    if(isLoading) return <Loading />
    return (
        <div className="limited-width-layout__content">
            {/* Title */}
            <div className="text-4xl mt-4">{postDetail.title}</div>
            <div className="grid grid-cols-4 mt-4">
                <div className="col-span-3">
                    {/* Image */}
                    {/* <div className="h-96">
                        <Image
                            src={postDetail.image_path}
                            alt=""
                            className="w-full h-full"
                            width="0"
                            height="0"
                            sizes="100vw" />
                    </div> */}
                    <div dangerouslySetInnerHTML={{__html: postDetail.content}} />

                    {/* General */}
                    <div className="mt-4">
                        <div className="grid grid-cols-4 mt-3">
                            <div className="col-span-1 text-xl">Rating</div>
                            <div className="col-span-3">
                                {/* <Rating value={postDetail.rating} readOnly={true} /> */}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 mt-3">
                            <div className="col-span-1 text-xl">Location</div>
                            <div className="col-span-3">
                                <div>- Good relaxed</div>
                            </div>
                        </div>
                        {/* <div className="grid grid-cols-4 mt-3">
                            <div className="col-span-1 text-xl">Highlights</div>
                            <div className="col-span-3">
                                {postDetail.highlights ? postDetail.highlights.map((item: any, index: number) => (
                                    <div key={index}>- {item}</div>
                                )) : ''}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 mt-3">
                            <div className="col-span-1 text-xl">Description</div>
                            <div className="col-span-3">
                                <div>{postDetail.description}</div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className='col-span-1 h-96 ml-8 rounded border border-slate-300 p-4 text-center'>
                    {/* <button>OK</button> */}
                </div>
            </div>
        </div>
    )
}