import { NextResponse } from "next/server";
import { databases, DATABASE_ID, COLLECTION_ID } from "@/lib/appwrite";

// GET tributes
export async function GET() {
  try {
    const tributes = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return NextResponse.json(tributes.documents);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST tribute
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, message, imageUrl, relationship } = body;

    const tribute = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      "unique()", // auto-generate ID
      {
        name,
        message,
        imageUrl,
        relationship,
        date: new Date().toISOString(),
      }
    );

    return NextResponse.json(tribute);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
