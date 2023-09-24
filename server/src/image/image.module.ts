import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
    controllers: [ImageController],
    providers: [ImageService]
})
export class ImageModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply()
            .forRoutes(
                { path: 'image/upload', method: RequestMethod.POST },
                { path: 'image/:id', method: RequestMethod.GET },
            )
    }
}
