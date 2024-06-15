import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD
    }
});

export async function sendActiveEmail(origin: string, email: string, token: string) {
    const mainOptions = {
        from: 'TripPlan',
        to: email,
        subject: 'Activate TripPlan account',
        text: 'This email has been used to register an account on TripPlan. Please click on the following link to activate your account on TripPlan.',
        html: `<a href="${origin}/eng/auth/activation/${token}">Click here</a>`
    }

    await transporter.sendMail(mainOptions);
}

export async function sendEmailChangePassword(email: string, token: string) {
    const mainOptions = {
        from: 'TripPlan',
        to: email,
        subject: 'Change password TripPlan account',
        text: 'This email has been used to change your account password on TripPlan. Please click on the following link to change password on TripPlan.',
        html: `<a href="${origin}/eng/auth/change-password/${token}">Click here</a>`
    }

    await transporter.sendMail(mainOptions);
}

export function generateToken(username: string, email: string, secrect: string): string {
    const encryptedData = jwt.sign({
        username: username,
        email: email,
    }, secrect, { expiresIn: 24 * 60 * 60 });   // 1 day equal session lifetime

    return encryptedData;
}

export function decryptToken(token: string, secrect: string): string | jwt.JwtPayload {
    const decoded = jwt.verify(token, secrect);
    return decoded;
}