
import Image from 'next/image';
import { PostProps } from "@/utils/types";
import * as API from "../../../utils/apiHelper";
import Rating from '@mui/material/Rating';
// import { Booking } from '../components/Booking';

export default async function PostDetail({ params }: { params: { id: string } }) {
    const postDetail = await getPostDetail(params.id);
    // function myAction() {
    //     alert('aaa');
    // }

    return (
        <div className="limited-width-layout__content">
            {/* Title */}
            <div className="text-4xl mt-4">{postDetail.title}</div>
            <div className="grid grid-cols-4 mt-4">
                <div className="col-span-3">
                    {/* Image */}
                    <div className="h-96">
                        <Image
                            src={postDetail.image_path}
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
                                {/* <Rating value={postDetail.rating} readOnly={true} /> */}
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
                                {postDetail.highlights ? postDetail.highlights.map((item, index) => (
                                    <div key={index}>- {item}</div>
                                )) : ''}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 mt-3">
                            <div className="col-span-1 text-xl">Description</div>
                            <div className="col-span-3">
                                <div>{postDetail.description}</div>
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

const getPostDetail = async (id: string) => {
    const postDetail: PostProps = await API.getPostById(id);
    return postDetail;
}