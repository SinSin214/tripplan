import { PrismaService } from 'prisma/prisma.service';
export declare class PostService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<any[]>;
    getDetail(id: string): Promise<Object>;
}
