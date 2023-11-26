import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        {path: 'post/all', method: RequestMethod.GET},
        {path: 'post/highlights', method: RequestMethod.GET},
        {path: 'post/:id', method: RequestMethod.GET},
        {path: 'post', method: RequestMethod.POST}
      )
  }

}