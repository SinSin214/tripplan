import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThreadModule } from './thread/thread.module';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import { CheckAuthMiddleware } from './middlewares/checkAuth';
import { ThreadController } from './thread/thread.controller';
import { SelectionModule } from './selection/selection.module';

@Module({
  imports: [ThreadModule, ImageModule, AuthModule, SelectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware)
      .exclude('thread/highlights', 'thread/all', 'thread/:id')
      .forRoutes(ThreadController);
  }
}