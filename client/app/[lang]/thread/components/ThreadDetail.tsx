import { Fragment, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import moment from 'moment';
import Tag from '../../components/Tag/Tag';
import edjsHTML from 'editorjs-html';
import { Avatar, Button } from '@mui/material';

export default function ThreadDetail(props: { threadDetail: any }) {
    const { threadDetail } = props;
    const [contentHTML, setContentHTML] = useState<string[]>();

    useEffect(() => {
        const edjsParser = edjsHTML({
            // Image parser
            image: (block: any) => {
                return `
                <div className="h-fit">
                    <img src="${block.data.file.url}" />
                    <div className="image-caption">${block.data.caption}</div>
                </div>
            `;
            },
            // Paragraph parser
            paragraph: (block: any) => {
                return `<div>${block.data.text}</div>`
            }
        });
    
        const parsedContent = edjsParser.parse({
            blocks: threadDetail.content
        });

        setContentHTML(parsedContent);
    }, [])

    return (
        <Fragment>
            <div className="grid gap-8">
            {/* Title */}
                <div className="thread-title">{threadDetail.title}</div>
                <div className="thread-description">{threadDetail.description}</div>
                <div className="thread-creation flex justify-between">
                    <div className="text-lg font-semibold">
                        <Button>
                            <Avatar className="mr-2" alt="avatar" src={threadDetail.creator.avatarPath} />
                            {threadDetail.creator.displayName}
                        </Button>
                    </div>
                    <div className="created-time" >
                        {moment(threadDetail.createdAt).format('MM-DD-YYYY HH:mm:ss')}
                    </div>
                </div>
                <div className="thread-content grid gap-8" id="content-container">
                    {contentHTML ? parse(contentHTML.join("")) : ''}
                </div>
            </div>
            {/* General */}
            <div>
                <div className="flex w-fit list-none">
                    {threadDetail.tags.map((item: any) => {
                        return (
                            <Tag tagDetail={item} />
                        );
                    })}
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