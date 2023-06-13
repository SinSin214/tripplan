import * as userService from '../services/user.service';
import { checkUsername, checkEmail, checkPassword, encryptPassword } from '../helpers/authentication';
import { Request, Response } from 'express';

export async function register(req: Request, res: Response) {
    let { username, email, password, confirmPassword } = req.body;
    await registerValidation(username, email, password, confirmPassword);
    let encryptedPassword = await encryptPassword(password);

    let createdUser = await userService.createUser(username, email, encryptedPassword);
    return res.status(200).json(createdUser);
}

export async function login() {
    
}

async function registerValidation(username: string, email: string, password: string, confirmPassword: string) {
    let users = await userService.getAllUsernameAndEmail();

    checkUsername(username, users);
    checkEmail(email, users);
    checkPassword(password, confirmPassword);
}
