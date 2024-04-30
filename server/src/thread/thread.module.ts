import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';

@Module({
  providers: [ThreadService],
  controllers: [ThreadController],
  imports: [PrismaModule]
})
export class ThreadModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        {path: 'thread/all', method: RequestMethod.POST},
        {path: 'thread/highlights', method: RequestMethod.GET},
        {path: 'thread/:id', method: RequestMethod.GET},
        {path: 'thread', method: RequestMethod.POST}
      )
  }

}