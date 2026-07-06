import nodemailer from "nodemailer";
import dns from "dns";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4, // Force IPv4
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 30000,
});

export default transporter