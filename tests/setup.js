import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

export async function connectDB() {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    process.env.JWT_SECRET = "testsecretkey";
    await mongoose.connect(uri);
}

export async function disconnectDB() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) {
        await mongoServer.stop();
    }
}