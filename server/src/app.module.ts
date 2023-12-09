import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { CheckAuthMiddleware } from './middlewares/checkAuth';
import { PostController } from './post/post.controller';

@Module({
  imports: [PostModule, ImageModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware)
      .forRoutes(PostController);
  }
}
