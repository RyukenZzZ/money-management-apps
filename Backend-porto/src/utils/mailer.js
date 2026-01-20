import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});

export const sendOtpEmail = async (email, otp) => {
    await transporter.sendMail({
        from: `Money Management App <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Code to verify your email address",
        html:`
        <h2>Verification Code is:</h2>
        <h1>${otp}</h1> 
        <p> this code will expire in 5 minutes </p>

   `})
}