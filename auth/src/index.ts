import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
	console.log("Starting up...");
	
	if (!process.env.JWT_KEY) {
		throw new Error("JWT key not specified");
	}

	if (!process.env.MONGO_URI) {
		throw new Error("MongoDB URI must be specified");
	}

	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");
	} catch (err) {
		console.log(err);
	}

	app.listen(3000, () => {
		console.log("Listening on port 3000!");
	});
};

start();
