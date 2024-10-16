import mongoose, { mongo } from "mongoose";

let cached = (global as any).mongoose || { conn: null, promise: null };

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDb = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "eventlt",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  console.log("Coonected to database");

  return cached.conn;
};
