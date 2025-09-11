import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Generate OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    // Save OTP in DB
    await db.query(
      "INSERT INTO otps (email, code, expires_at) VALUES (?, ?, ?)",
      [email, code, expiresAt]
    );

    // Nodemailer transporter (using Gmail SMTP + App Password)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP email
    await transporter.sendMail({
      from: `"School App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your School App OTP",
      text: `Your OTP is ${code}. It will expire in 10 minutes.`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("OTP Request Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
