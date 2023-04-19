import { PostProps } from "@/utils/types";
import * as API from "../../../utils/apiHelper";
import Image from 'next/image';

export default async function PostDetail({params}: { params: { id: string}}) {
    const postDetail = await getServerSideProps(params.id);
    console.log(postDetail);
    return (
        <div className="limited-width-layout__content">
            {postDetail ? postDetail.title : ''}
            <div className="w-3/4 h-96">
            <Image
                src={postDetail.image_path}
                alt=""
                className="w-full h-full"
                width="0"
                height="0"
                sizes="100vw" />
            </div>
        </div>
    )
}

async function getServerSideProps(id: string) {
	const postDetail: PostProps = await API.getPostById(id);
	return postDetail;
}