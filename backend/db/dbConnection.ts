import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function dbConnect() {
    try {
        await prisma.$connect();
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1); // Exit the application if we can't connect to the database
    }
}