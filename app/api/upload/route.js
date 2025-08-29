import { NextResponse } from "next/server";
import { Client, Storage, ID, Permission, Role } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const storage = new Storage(client);

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const uploaded = await storage.createFile(
      process.env.NEXT_PUBLIC_STORAGE_BUCKET_ID,
      ID.unique(),
      file,
      [
        Permission.read(Role.any()), // public read
      ]
    );

    return NextResponse.json({ fileId: uploaded.$id });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
};
