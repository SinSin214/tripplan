import nodemailer from 'nodemailer';

let testAccount = {
    user: '',
    pass: ''
}
let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
})

export async function sendVerificationMail(email: string) {
    testAccount = await nodemailer.createTestAccount();

    await transporter.sendMail({
        from: 'Trip Plan', // sender address
        to: [email], // list of receivers
        subject: "Email verification", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
}