import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { ImageModule } from './image/image.module';

@Module({
  imports: [PostModule, PrismaModule, ImageModule],
  controllers: [AppController, ImageController],
  providers: [AppService, ImageService],
})
export class AppModule {}
