import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Error in database connection:", error.message);
    process.exit(1); // Exit with failure
  }
};
