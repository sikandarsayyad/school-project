import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// POST - Add new school
export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const image = formData.get("image");

    let fileBase64 = null;

    if (image && typeof image === "object") {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fileBase64 = `data:${image.type};base64,${buffer.toString("base64")}`;
    }

    // Save school in DB, store Base64 string in `image` column
    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, fileBase64]
    );

    return NextResponse.json(
      { message: "School added successfully!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ API POST Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET - Fetch all schools
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM schools ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (err) {
    console.error("❌ API GET Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
