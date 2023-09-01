import * as userService from '../services/user-service';
import * as authHelper from '../helpers/authentication';
import { sendVerificationMail } from '../helpers/mail-transporter';
import { NextFunction, Request, Response } from 'express';

export async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        let { username, email, password, confirmPassword } = req.body;
        let hostname = req.headers.host;
        await signUpValidation(username, email, password, confirmPassword);
        let encryptedPassword = await authHelper.encryptPassword(password);

        let createdUser = await userService.createUser(username, email, encryptedPassword);
        await sendVerificationMail(email, createdUser.id, hostname);
        return res.status(200).json(createdUser);
    }
    catch (err) {
        next(err);
    }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
    try {
        let { email, password } = req.body;

        let user: any = await userService.getUserByEmail(email);
        if(!user) throw Error('Username does not exist');
        if(user.is_inactive) throw Error('Inactive user');

        let validPassword = await authHelper.comparePassword(password, user.password);
        if(!validPassword) throw Error('Incorrect password');
        
        let token = authHelper.generateToken(email);
        // login success
        return token;
    }
    catch (err) {
        next(err);
    }
}

export async function checkAuthRequest(req: Request, res: Response, next: NextFunction) {
    let { token } = req.body;
    await authHelper.verifyToken(token);
    next();
}

export async function activeUser(req: Request, res: Response, next: NextFunction) {
    let { userId } = req.params;
    if(userId) {
        userService.activeUser(userId);
    }
}


async function signUpValidation(username: string, email: string, password: string, confirmPassword: string) {
    let users = await userService.getAllUsernameAndEmail();
    let emails = users.map(item => item.email);
    let usernames = users.map(item => item.username);

    authHelper.checkUsername(username, usernames);
    authHelper.checkEmail(email, emails);
    authHelper.checkPassword(password, confirmPassword);
}
