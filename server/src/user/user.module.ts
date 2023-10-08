import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
        .apply()
        .forRoutes(
            { path: 'auth/signIn', method: RequestMethod.POST },
            { path: 'auth/signUp', method: RequestMethod.POST },
            { path: 'auth/forgotPassword', method: RequestMethod.POST },
        )
}
}
