import { PostProps } from "@/utils/types";
import * as API from "../../utils/apiHelper";
import PostItem from './components/PostItem'

export default async function Destination () {
    const aPosts = await getListPosts();
    return (
        <div className="limited-width-layout__content">
            {aPosts.length ? aPosts.map((item: any) =>
                <PostItem key={item.id} post={item} />
            ) : ''}
        </div>
    )
}

const getListPosts = async () => {
    const aPosts = await API.getPosts();
    return aPosts;
}