'use client';
import { IThreadOverviewType } from "@/utils/types";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
import ThreadCard from "./components/ThreadCard";

export default function ListThread() {
    const [listThreads, setListThreads] = useState<IThreadOverviewType[]>([])
    const { requestAPI, navigation } = useContext(AppContext);

    useEffect(() => {
        async function getListThreads() {
            try {
                const res = await requestAPI('/thread/all', 'POST');
                setListThreads(res);
            }
            catch(err: any) {
                toast.error(err.response.data.message);
            }
        };
        getListThreads();
    }, []);

    async function onCardClick(threadId: string) {
        try {
            const threadDetail = await requestAPI(`/thread/${threadId}`, 'GET');
            navigation(`/thread/${threadDetail.id}`);
        } catch(err: any) {
            toast.error(err.response.data.message);
        }
    }

    return(
        <div className="md-limited-width-layout__content">
            {listThreads.map((item: IThreadOverviewType) => (
                <ThreadCard key={item.id} ThreadOverview={item} onCardClick={onCardClick} />
            ))}
        </div>
    )
}