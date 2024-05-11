import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SelectionController } from './selection.controller';
import { SelectionService } from './selection.service';

@Module({
  providers: [SelectionService],
  controllers: [SelectionController],
  imports: [PrismaModule]
})
export class SelectionModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        {path: 'selections', method: RequestMethod.GET},
      )
  }
}