import mongoose from "mongoose";


export async function connectDB() {
    if (mongoose.connections[0].readyState === 1) {
        return;
    }
    try {
        const mongoUri = process.env.MONGO_URL;
        if (!mongoUri) {
            throw new Error("Please provide MONGO_URL in the environment variables");
        }
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to connect to MongoDB");
    }
}