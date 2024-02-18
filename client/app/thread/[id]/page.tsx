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
    const edjsParser = edjsHTML({
        image: imageParser,
        paragraph: paragraphParser
    });
    const [contentHTML, setContentHTML] = useState<any>();

    function imageParser(block: any){
        return `
            <div className="h-fit">
                <img src="${block.data.file.url}" />
                <div className="image-caption">${block.data.caption}</div>
            </div>
        `;
    }

    function paragraphParser(block: any) {
        return `
            <div>${block.data.text}</div>
        `
    }

    useEffect(() => {
        async function getThread() {
            try {
                setIsLoading(true);
                const res = await requestAPI(`/thread/${params.id}`, 'GET');
                setThreadDetail(res.threadDetail);
                let parsed = edjsParser.parse({
                    blocks: res.threadDetail.content
                });
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
            <div className="grid gap-8">
            {/* Title */}
            <div className="thread-title">{threadDetail.title}</div>
            <div className="thread-description">{threadDetail.description}</div>
            <div className="thread-author">
                <div className="author-name">
                    {threadDetail.author}
                </div>
                <div>
                    {threadDetail.createdAt}
                </div>
            </div>
            <div className="thread-content grid gap-5" id="content-container">
                {contentHTML ? parse(contentHTML.join("")) : ''}
            </div>

            {/* General */}
            <div>
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
            </div>
            </div>
        </div>
    )
}