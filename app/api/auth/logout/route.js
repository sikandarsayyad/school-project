// app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  // Clear the token cookie
  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",       // important to match path where cookie was set
    maxAge: 0,
  });

  return res;
}
