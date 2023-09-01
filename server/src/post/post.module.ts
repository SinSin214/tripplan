import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from '../../prisma/prisma.service'

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService]
})
export class PostModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        {path: 'post/getAll', method: RequestMethod.GET},
        {path: 'post/getDetail/:id', method: RequestMethod.GET}
      )
  }

}