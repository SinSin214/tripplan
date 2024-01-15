'use client';
import { AppContext } from '@/app/context/appContext';
import Rating from '@mui/material/Rating';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '@/app/loading';
import edjsHTML from 'editorjs-html';
import parse from 'html-react-parser';

interface IThreadDetail {
    title: string,
    content: string
}

export default function ThreadDetail({ params }: { params: { id: string } }) {
    const { requestAPI } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [threadDetail, setThreadDetail] = useState<any>({
        title: '',
        content: ''
    });
    const edjsParser = edjsHTML();
    const [contentHTML, setContentHTML] = useState<any>();

    useEffect(() => {
        async function getThread() {
            try {
                setIsLoading(true);
                const ThreadDetail = await requestAPI(`/thread/${params.id}`, 'GET');
                setThreadDetail(ThreadDetail);
                let contentParsed = JSON.parse(ThreadDetail.content);
                let ab = {
                    blocks: []
                };
                ab.blocks = contentParsed;
                let parsed = edjsParser.parse(ab);
                setContentHTML(parsed);

            } catch(err: any) {
                toast.error(err.response.data.message);
            } finally {
                setIsLoading(false);
            }
        };
        getThread();
    }, [])
    if(isLoading) return <Loading />
    return (
        <div className="md-limited-width-layout__content">
            {/* Title */}
            <div className="text-4xl mt-4">{threadDetail.title}</div>
            <div>
                    {/* Image */}
                    {/* <div className="h-96">
                        <Image
                            src={threadDetail.imagePath}
                            alt=""
                            className="w-full h-full"
                            width="0"
                            height="0"
                            sizes="100vw" />
                    </div> */}
                    <div id="content-container">
                        {contentHTML ? parse(contentHTML.join("")) : ''}
                    </div>

                    {/* General */}
                    <div className="mt-4">
                        <div className="grid grid-cols-4 mt-3">
                            <div className="col-span-1 text-xl">Rating</div>
                            <div className="col-span-3">
                                {/* <Rating value={threadDetail.rating} readOnly={true} /> */}
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
                                {threadDetail.highlights ? threadDetail.highlights.map((item: any, index: number) => (
                                    <div key={index}>- {item}</div>
                                )) : ''}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 mt-3">
                            <div className="col-span-1 text-xl">Description</div>
                            <div className="col-span-3">
                                <div>{threadDetail.description}</div>
                            </div>
                        </div> */}
                    </div>
            </div>
        </div>
    )
}