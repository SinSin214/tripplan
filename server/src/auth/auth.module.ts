import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PrismaModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: 'auth/signIn', method: RequestMethod.POST },
        { path: 'auth/signUp', method: RequestMethod.POST },
        { path: 'auth/signOut', method: RequestMethod.POST },
        { path: 'auth/forgotPassword', method: RequestMethod.POST },
        { path: 'auth/activate/:activeToken', method: RequestMethod.GET },
        { path: 'auth/changePassword/:token', method: RequestMethod.POST },
        { path: 'auth/check_token_expiration', method: RequestMethod.POST}
      )
  }
}
