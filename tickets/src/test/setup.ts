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
	const email = "user@example.com";
	const password = "password";

	const response = await request(app)
		.post("/api/users/signup")
		.send({ email, password })
		.expect(201);

	const cookie = response.get("Set-Cookie");

	if (!cookie) {
		throw new Error("Failed to get cookie from response");
	}

	return cookie;
};
