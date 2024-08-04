'use client';
import { Fragment, useContext, useEffect, useState } from 'react';
import ThreadDetail from '../components/ThreadDetail';
import { ThumbUpRounded, ThumbDownRounded } from '@mui/icons-material';
import { AppContext } from '../../context/appContext';
import { RequestMethod } from '@/types/globalType';
import Loading from '../../loading';

export default function Thread({ params }: { params: { id: string } }) {
    const { requestAPI } = useContext(AppContext);
    const [threadDetail, setThreadDetail] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getThreadDetailById() {
            try {
                setIsLoading(true);
                const res = await requestAPI(`/thread/${params.id}`, RequestMethod.Get);
                const threadDetail = res.data;
                setThreadDetail(threadDetail);
            } finally {
                setIsLoading(false);
            }
        };
        getThreadDetailById();
    }, [])

    if (!threadDetail || isLoading) return <Loading />

    return (
        <Fragment>
            <div className="md-limited-width-layout__content">
                <div className="grid py-8">
                    <ThreadDetail threadDetail={threadDetail} />
                </div>
            </div>
            <div className="sticky-bar top-1/4 items-center grid gap-2">
                <ThumbUpRounded fontSize="medium" />
                <h2>13</h2>
                <ThumbDownRounded fontSize="medium" />
            </div>
        </Fragment>
    )
}