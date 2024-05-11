import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';

const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD
    }
});

export async function sendActiveEmail(origin: string, email: string, activateToken: string) {
    let mainOptions = {
        from: 'TripPlan',
        to: email,
        subject: 'Activate TripPlan account',
        text: 'This email has been used to register an account on TripPlan. Please click on the following link to activate your account on TripPlan.',
        html: `<a href="${origin}/eng/auth/activation/${activateToken}">Click here</a>`
    }

    await transporter.sendMail(mainOptions);
}

export async function sendEmailChangePassword(email: string, token: string) {
    let mainOptions = {
        from: 'TripPlan',
        to: email,
        subject: 'Change password TripPlan account',
        text: 'This email has been used to change your account password on TripPlan. Please click on the following link to change password on TripPlan.',
        html: `<a href="${origin}/eng/auth/change-password/${token}">Click here</a>`
    }

    await transporter.sendMail(mainOptions);
}

export function generateRefreshToken(username: string, email: string) {
    let refreshTokenExpire = 864000;

    return jwt.sign({ username: username, email: email }, process.env.SECRECT_REFRESH_TOKEN, {
        expiresIn: refreshTokenExpire
    });
}

export function generateAccessToken(username: string, email: string) {
    let accessTokenExpire = 86400;
    
    return jwt.sign({ username: username, email: email }, process.env.SECRECT_ACCESS_TOKEN, {
        expiresIn: accessTokenExpire
    });
}

export function generateChangePasswordToken(username: string, email: string) {
    let changePasswordExpire = 86400;
    
    return jwt.sign({ username: username, email: email }, process.env.SECRECT_CHANGE_PASSWORD_TOKEN, {
        expiresIn: changePasswordExpire
    });
}

export function generateActivateToken(username: string, email: string) {
    let activateTokenExpire = 86400;
    
    return jwt.sign({ username: username, email: email }, process.env.SECRECT_ACTIVATE_USER_TOKEN, {
        expiresIn: activateTokenExpire
    });
}