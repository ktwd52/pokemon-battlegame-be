import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("\x1b[32mMongoDB connected\x1b[0m");
} catch (error) {
  console.error("\x1b[31mMongoDB connection error:\x1b[0m", error);
  process.exit(1);
}
