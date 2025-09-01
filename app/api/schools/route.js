import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

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

    let fileName = null;
    if (image && typeof image === "object") {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      fileName = Date.now() + "-" + image.name;
      const filePath = path.join(process.cwd(), "public/schoolImages", fileName);

      await writeFile(filePath, buffer);
    }

    // await db.query(`USE schooldb`);

    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, fileName]
    );

    return NextResponse.json({ message: "School added successfully!" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error adding school" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM schools ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error fetching schools" }, { status: 500 });
  }
}
