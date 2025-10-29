import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
});

export const sendBudgetAlert = async ({ to, subject, text }) => {
  try {
    transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};
