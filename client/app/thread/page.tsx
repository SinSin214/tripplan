'use client';
import { IThreadOverviewType } from "@/utils/types";
import { Box, Tab, Tabs } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";
import ThreadCard from "./components/ThreadCard";

export default function ListThread() {
    const [listThreads, setListThreads] = useState<IThreadOverviewType[]>([])
    const { requestAPI, navigation } = useContext(AppContext);
    const [tab, setTab] = useState<string>('new');

    useEffect(() => {
        getListThreads();
    }, [tab]);

    async function onCardClick(threadId: string) {
        try {
            const threadDetail = await requestAPI(`/thread/${threadId}`, 'GET');
            navigation(`/thread/${threadDetail.id}`);
        } catch(err: any) {
            toast.error(err.response.data.message);
        }
    }

    async function onTabChange(e: React.SyntheticEvent, newValue: string) {
        setTab(newValue);
    }

    async function getListThreads() {
        try {
            let paramObject = {
                sort: tab
            };
            const res = await requestAPI(`/thread/all`, 'POST', paramObject);
            setListThreads(res);
        }
        catch(err: any) {
            toast.error(err.response.data.message);
        }
    };

    return(
        <div className="md-limited-width-layout__content">
            {/* TabBar */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={(e, newValue) => onTabChange(e, newValue)}>
                    <Tab label="Newest" value="new" />
                    <Tab label="Hot" value="hot" />
                    <Tab label="Rate" value="rate" />
                </Tabs>
            </Box>
            <div role="tabpanel">
                {/* List thread */}
                <div className="grid gap-12 py-5">
                    {listThreads.map((item: IThreadOverviewType) => (
                        <ThreadCard key={item.id} ThreadOverview={item} onCardClick={onCardClick} />
                    ))}
                </div>
            </div>
        </div>
    )
}