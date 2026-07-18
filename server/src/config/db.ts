import dns from "node:dns";

dns.setServers(["1.1.1.1", "1.0.0.1"]);

import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

export async function connectToMongoDB() {
    try {
        // await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
    // await client.close();
}