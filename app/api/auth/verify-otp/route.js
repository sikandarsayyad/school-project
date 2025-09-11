import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) return NextResponse.json({ error: "Missing data" }, { status: 400 });

    const [rows] = await db.query(
      "SELECT * FROM otps WHERE email=? AND code=? AND used=FALSE ORDER BY id DESC LIMIT 1",
      [email, code]
    );

    const otp = rows[0];
    if (!otp) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    if (new Date(otp.expires_at) < new Date()) return NextResponse.json({ error: "Expired" }, { status: 400 });

    await db.query("UPDATE otps SET used=TRUE WHERE id=?", [otp.id]);
    await db.query("INSERT IGNORE INTO users (email) VALUES (?)", [email]);

    const res = NextResponse.json({ message: "Logged in" });
    setAuthCookie(res, { email });
    return res;
  } catch (err) {
    console.error("OTP Verify Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
