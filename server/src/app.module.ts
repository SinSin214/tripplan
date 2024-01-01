import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import { CheckAuthMiddleware } from './middlewares/checkAuth';
import { PostController } from './post/post.controller';

@Module({
  imports: [PostModule, ImageModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware)
      .exclude('post/highlights')
      .forRoutes(PostController);
  }
}
