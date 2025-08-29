// app/api/tributes/route.js
import { NextResponse } from "next/server";
import { databases, storage, ID, DATABASE_ID, COLLECTION_ID, BUCKET_ID } from "@/lib/appwrite";
import { Permission, Role } from "appwrite";



export async function GET() {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

    const tributes = res.documents.map((doc) => {
      // Generate a file view URL if imageId exists
      const imageUrl = doc.imageId
        ? storage.getFileView(BUCKET_ID, doc.imageId) // returns a URL string
        : null;

      return { ...doc, imageUrl };
    });

    return NextResponse.json(tributes);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch tributes" }, { status: 500 });
  }
}



export async function POST(req) {
  try {
    const body = await req.json();
    const { name, relationship, message, date, imageId } = body;

    const tribute = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      { name, relationship, message, date, imageId },
      [
        Permission.read(Role.any()),  // ✅ anyone can read
      ]
    );

    return NextResponse.json(tribute);
  } catch (err) {
    console.error("POST /api/tributes error:", err);
    return NextResponse.json({ error: "Failed to create tribute" }, { status: 500 });
  }
}
