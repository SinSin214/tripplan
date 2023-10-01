import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PostModule, ImageModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
