import { User } from 'prisma/prisma-client';
import * as nodemailer from 'nodemailer';

const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD
    }
});

export async function sendActiveEmail(user: User, activateToken: string) {
    let mainOptions = {
        from: 'TripPlan',
        to: user.email,
        subject: 'Activate TripPlan account',
        text: 'This email has been used to register an account on TripPlan. Please click on the following link to activate your account on TripPlan.',
        html: `<a href="http://localhost:${process.env.PORT_CLIENT}/auth/activation/${activateToken}">Click here</a>`
    }

    await transporter.sendMail(mainOptions);
}

export async function sendEmailChangePassword(email: string, token: string) {
    let mainOptions = {
        from: 'TripPlan',
        to: email,
        subject: 'Change password TripPlan account',
        text: 'This email has been used to change your account password on TripPlan. Please click on the following link to change password on TripPlan.',
        html: `<a href="http://localhost:${process.env.PORT_CLIENT}/auth/change-password/${token}">Click here</a>`
    }

    await transporter.sendMail(mainOptions);
}