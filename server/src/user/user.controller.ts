import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {};

    @Post('signUp')
    async signUp(@Body() body) {
        const { email } = body.email;
        await this.userService.check
        // return await this.userService.signUp();
    }

    async checkEmailExist(email: string) {
        await this.userService.getEmaill(email);
    }
}
