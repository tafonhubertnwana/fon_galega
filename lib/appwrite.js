import { Client, Databases, Storage, ID } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)


export const databases = new Databases(client);
export const storage = new Storage(client);
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID;
export const COLLECTION_ID = process.env.NEXT_PUBLIC_TRIBUTE_FORM_ID;
export const BUCKET_ID = process.env.NEXT_PUBLIC_STORAGE_BUCKET_ID;

export { ID };
