import * as userService from '../services/user-service';
import * as authHelper from '../helpers/authentication';
import { sendVerificationMail } from '../helpers/mail-transporter';
import { NextFunction, Request, Response } from 'express';

export async function signUp(req: Request, res: Response) {
    let { username, email, password, confirmPassword } = req.body;
    await signUpValidation(username, email, password, confirmPassword);
    let encryptedPassword = await authHelper.encryptPassword(password);

    let createdUser = await userService.createUser(username, email, encryptedPassword);
    sendVerificationMail(email);
    return res.status(200).json(createdUser);
}

export async function signIn(req: Request, res: Response) {
    let { email, password } = req.body;
    let user: any = await userService.getUserByEmail(email);
        if(user) {
        let hashPassword = user.password;
        let validPassword = await authHelper.comparePassword(password, hashPassword)
        if(validPassword) {
            if(user.is_active) {
                let token = authHelper.generateToken(email);
                // login success
                return token;
            }
            else throw new Error('Unactive user');
        }
    }
    // fail
}

export async function checkAuthRequest(req: Request, res: Response, next: NextFunction) {
    let { token } = req.body;
    await authHelper.verifyToken(token);
    next();
}

export async function confirmEmail(req: Request, res: Response, next: NextFunction) {
    let { email } = req.body;
    userService.activeUser(email);
}

async function signUpValidation(username: string, email: string, password: string, confirmPassword: string) {
    let users = await userService.getAllUsernameAndEmail();
    let emails = users.map(item => item.email);
    let usernames = users.map(item => item.username);

    authHelper.checkUsername(username, usernames);
    authHelper.checkEmail(email, emails);
    authHelper.checkPassword(password, confirmPassword);
}
