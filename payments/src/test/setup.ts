import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";

declare global {
	var signin: (id?: string) => string[];
}

jest.mock("../nats-wrapper");

let mongo: any;
beforeAll(async () => {
	process.env.JWT_KEY = "testenv";
	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();

	await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
	jest.clearAllMocks();
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

global.signin = (id?: string) => {
	// Build a JWT payload. { id, email }
	const payload = {
		id: id || new mongoose.Types.ObjectId().toHexString(),
		email: "test@test.com",
	};

	// Create the JWT
	const token = jwt.sign(payload, process.env.JWT_KEY!);

	// Build Session Object. { jwt: MY_JWT }
	const session = { jwt: token };

	// TUrn that session into JSON
	const sessionJSON = JSON.stringify(session);

	// Encode the session string as base64
	const base64 = Buffer.from(sessionJSON).toString("base64");

	// Return a string that includes the encoded session
	return [`session=${base64}`];

	// Take JSON and encode it as base64
	// return a string that the cookie with the encoded data
};
