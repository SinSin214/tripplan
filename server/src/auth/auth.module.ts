import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [PrismaModule]
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: 'auth/sign_in', method: RequestMethod.POST },
        { path: 'auth/sign_up', method: RequestMethod.POST },
        { path: 'auth/sign_out', method: RequestMethod.GET },
        { path: 'auth/forgot_password', method: RequestMethod.POST },
        { path: 'auth/activate/:activeToken', method: RequestMethod.GET },
        { path: 'auth/change_password', method: RequestMethod.POST },
        { path: 'auth/check_permission', method: RequestMethod.GET }
      )
  }
}
