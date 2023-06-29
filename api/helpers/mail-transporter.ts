import nodemailer from 'nodemailer';
import { Request } from 'express';

export async function sendVerificationMail(email: string, userId: string, hostname: string | undefined) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'tranhuynhkha21496@gmail.com', // generated ethereal user
            pass: 'zhaottmzemwaqesb', // generated ethereal password
        },
    });
    let linkURL = `http://${hostname}/auth/activeUse?userId=${userId}`;
    let html = `<html>
    <body>
    <a href="`+ linkURL +`">Click to active</a>
    </body>
</html>`
    await transporter.sendMail({
        from: 'Trip Plan', // sender address
        to: [email], // list of receivers
        subject: "Email verification", // Subject line
        text: "Hello world?", // plain text body
        html: html, // html body
    });
}