import { PostProps } from "@/utils/types";
import { useContext } from "react";
import { AppContext } from '@/app/context/appContext';
import PostItem from './components/PostItem'

export default async function Destination () {
    const { requestAPI } = useContext(AppContext)
    const aPosts = await requestAPI('/post/all', 'GET');
    return (
        <div className="limited-width-layout__content">
            {aPosts.length ? aPosts.map((item: any) =>
                <PostItem key={item.id} post={item} />
            ) : ''}
        </div>
    )
}