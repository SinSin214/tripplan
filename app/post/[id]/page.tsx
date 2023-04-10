import { PostProps } from "@/utils/types";
import * as API from "../../../api/api";

export default async function PostDetail({params}: { params: { id: string}}) {
    const postDetail = await getServerSideProps(params.id);
    return (
        <div className="limited-width-layout__content">
            {postDetail ? postDetail.title : ''}
        </div>
    )
}

async function getServerSideProps(id: string) {
	const postDetail: PostProps | undefined = await API.getPostById(id);
	return postDetail;
}