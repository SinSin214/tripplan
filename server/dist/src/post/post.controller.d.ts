import { PostService } from './post.service';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getAll(): Promise<any[]>;
    getDetail(id: string): Promise<Object>;
}
