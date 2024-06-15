import Loading from '../../loading';
import { toast } from 'react-toastify';
import { Fragment, useContext, useEffect, useState } from 'react';
import edjsHTML from 'editorjs-html';
import { AppContext } from '../../context/appContext';
import parse from 'html-react-parser';
import moment from 'moment';
import { RequestMethod } from '@/types/globalType';

export default function ThreadDetail(props: { id: string }) {
    const { requestAPI } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [threadDetail, setThreadDetail] = useState<any>(undefined);
    const [contentHTML, setContentHTML] = useState<any>();

    function imageParser(block: any) {
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
        async function getThreadDetailById() {
            setIsLoading(true);
            const res = await requestAPI(`/thread/${props.id}`, RequestMethod.Get);
            const threadDetail = res.data;
            setThreadDetail(threadDetail);
            const edjsParser = edjsHTML({
                image: imageParser,
                paragraph: paragraphParser
            });
            const parsedContent = edjsParser.parse({
                blocks: threadDetail.content
            });
            setContentHTML(parsedContent);
        };
        getThreadDetailById();
    }, [])
    if (!threadDetail) return <Loading />

    return (
        <Fragment>
            {/* Title */}
            <div className="thread-title">{threadDetail.title}</div>
            <div className="thread-description">{threadDetail.description}</div>
            <div className="thread-creation flex justify-between">
                <div className="text-lg font-semibold">
                    {threadDetail.creator.displayName}
                </div>
                <div className="created-time" >
                    {moment(threadDetail.createdAt).format('MM-DD-YYYY HH:mm:ss')}
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
        </Fragment>
    );
}