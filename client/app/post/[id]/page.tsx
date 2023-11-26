
import Image from 'next/image';
import { PostProps } from "@/utils/types";
import { AppContext } from '@/app/context/appContext';
import Rating from '@mui/material/Rating';
import { useContext } from 'react';
// import { Booking } from '../components/Booking';

export default async function PostDetail({ params }: { params: { id: string } }) {
    const { requestAPI } = useContext(AppContext);
    const oPostDetail = await requestAPI(`/post/${params.id}`, 'GET');

    return (
        <div className="limited-width-layout__content">
            {/* Title */}
            <div className="text-4xl mt-4">{oPostDetail.title}</div>
            <div className="grid grid-cols-4 mt-4">
                <div className="col-span-3">
                    {/* Image */}
                    <div className="h-96">
                        <Image
                            src={oPostDetail.image_path}
                            alt=""
                            className="w-full h-full"
                            width="0"
                            height="0"
                            sizes="100vw" />
                    </div>

                    {/* General */}
                    <div className="mt-4">
                        <div className="grid grid-cols-4 mt-3">
                            <div className="col-span-1 text-xl">Rating</div>
                            <div className="col-span-3">
                                {/* <Rating value={oPostDetail.rating} readOnly={true} /> */}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 mt-3">
                            <div className="col-span-1 text-xl">Location</div>
                            <div className="col-span-3">
                                <div>- Good relaxed</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 mt-3">
                            <div className="col-span-1 text-xl">Highlights</div>
                            <div className="col-span-3">
                                {oPostDetail.highlights ? oPostDetail.highlights.map((item: any, index: number) => (
                                    <div key={index}>- {item}</div>
                                )) : ''}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 mt-3">
                            <div className="col-span-1 text-xl">Description</div>
                            <div className="col-span-3">
                                <div>{oPostDetail.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 h-96 ml-8 rounded border border-slate-300 p-4 text-center'>
                    {/* <button>OK</button> */}
                </div>
            </div>
        </div>
    )
}