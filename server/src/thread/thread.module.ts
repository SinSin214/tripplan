import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ThreadController],
  providers: [ThreadService]
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