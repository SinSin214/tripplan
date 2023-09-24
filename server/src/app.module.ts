import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { ImageModule } from './image/image.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [PostModule, PrismaModule, ImageModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
