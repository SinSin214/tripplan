import axios from 'axios';
import { PostProps } from "@/utils/types";

let rootUrl = "http://localhost:3001";

export async function getPosts(): Promise<any> {
    let result = await axios.get(rootUrl + "/post/getAll");
    return result.data;
}

export async function getPostById(id: string): Promise<PostProps> {
    let result = await axios.post(rootUrl + "/post/getDetail", { id: id });
    return result.data;
}