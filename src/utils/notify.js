import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function sendEmailOtp(email, otp) {
  await transporter.sendMail({
    from: `"HandCraft"<${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your HandCraft verification code",
    html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: auto;">
        <h2>Verify your email</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
}
