import * as userService from '../services/user.service';
import { checkUsername, checkEmail, checkPassword, encryptPassword } from '../helpers/authentication';

export async function register(req, res, next) {
    let { username, email, password, confirmPassword } = req.body;
    await registerValidation(username, email, password, confirmPassword);
    let encryptedPassword = await encryptPassword(password);
    let user = {
        username: username,
        email: email,
        password: encryptedPassword
    };

    let createdUser = await userService.createUser(user);
    return res.status(200).json(createdUser);
}

export async function login() {
    
}

async function registerValidation(username, email, password, confirmPassword) {
    let users = await userService.getAllUsernameAndEmail();

    checkUsername(username, users);
    checkEmail(email, users);
    checkPassword(password, confirmPassword);
}
