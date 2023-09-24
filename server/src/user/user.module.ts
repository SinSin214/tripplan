import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
        .apply()
        .forRoutes(
            { path: 'user/signIn', method: RequestMethod.POST },
            { path: 'user/signUp', method: RequestMethod.POST },
            { path: 'user/forgotPassword', method: RequestMethod.POST },
        )
}
}
