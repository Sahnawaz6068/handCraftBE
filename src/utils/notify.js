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

export async function sendEmailNewVendorApplication({
  recipients,
  applicantName,
  applicantEmail,
  shopName,
  description,
}) {
  await transporter.sendMail({
    from: `"HandCraft" <${process.env.EMAIL_USER}>`,
    to: recipients,
    subject: "🛍️ New Vendor Application Submitted",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        
        <h2 style="color:#333;">New Vendor Application</h2>

        <p>A new vendor has submitted an application and is awaiting approval.</p>

        <table style="width:100%; border-collapse: collapse; margin-top:20px;">
          <tr>
            <td style="padding:8px; font-weight:bold;">Applicant</td>
            <td style="padding:8px;">${applicantName}</td>
          </tr>

          <tr>
            <td style="padding:8px; font-weight:bold;">Email</td>
            <td style="padding:8px;">${applicantEmail}</td>
          </tr>

          <tr>
            <td style="padding:8px; font-weight:bold;">Shop Name</td>
            <td style="padding:8px;">${shopName}</td>
          </tr>

          <tr>
            <td style="padding:8px; font-weight:bold;">Description</td>
            <td style="padding:8px;">${description}</td>
          </tr>
        </table>

        <p style="margin-top:25px;">
          Please review this application from the admin dashboard.
        </p>

        <hr>

        <p style="font-size:12px; color:#777;">
          This is an automated email from HandCraft Marketplace.
        </p>

      </div>
    `,
  });
}

export async function sendVendorApprovedMail({
  recipient,
  vendorName,
  shopName,
}) {
  await transporter.sendMail({
    from: `"HandCraft" <${process.env.EMAIL_USER}>`,
    to: recipient,
    subject: "🎉 Your Vendor Application Has Been Approved",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        
        <h2 style="color:#16a34a;">Congratulations, ${vendorName}! 🎉</h2>

        <p>
          We're happy to let you know that your vendor application has been
          <strong>approved</strong>.
        </p>

        <p>
          Your shop <strong>${shopName}</strong> is now an approved vendor on
          <strong>HandCraft</strong>.
        </p>

        <div style="background:#f3f4f6; padding:16px; border-radius:6px; margin:20px 0;">
          <h3 style="margin-top:0;">You can now:</h3>
          <ul>
            <li>Create products</li>
            <li>Manage your inventory</li>
            <li>Receive customer orders</li>
            <li>Track your sales</li>
          </ul>
        </div>

        <p>
          Log in to your account and start adding your products.
        </p>

        <hr style="margin:24px 0;">

        <p style="font-size:12px; color:#6b7280;">
          Thank you for joining the HandCraft marketplace. We look forward to helping you grow your business.
        </p>

      </div>
    `,
  });
}
