import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global {
	var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
	process.env.JWT_KEY = "testenv";
	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();

	await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
	if (mongoose.connection.db) {
		const collections = await mongoose.connection.db.collections();
		for (let collection of collections) {
			await collection.deleteMany({});
		}
	}
});

afterAll(async () => {
	if (mongo) {
		await mongo.stop();
	}
	await mongoose.connection.close();
});

global.signin = async () => {
	// Build a JWT payload. { id, email }
	// Create the JWT
	// Build Session Object. { jwt: MY_JWT }
	// Take JSON and encode it as base64
	// return a string that the cookie with the encoded data
};
