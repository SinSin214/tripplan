import { User } from 'prisma/prisma-client';
import nodemailer from 'nodemailer';

export async function sendActiveEmail(user: User, activateToken: string) {
    let transporter =  nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        }
    });

    let mainOptions = {
        from: 'TripPlan',
        to: user.email,
        subject: 'Activate TripPlan account',
        text: 'This email has been used to register an account on TripPlan. Please click on the following link to activate your account on TripPlan.',
        html: `<a href="http://localhost:${process.env.PORT}/user/activate/${activateToken}>`
    }

    await transporter.sendMail(mainOptions);
}