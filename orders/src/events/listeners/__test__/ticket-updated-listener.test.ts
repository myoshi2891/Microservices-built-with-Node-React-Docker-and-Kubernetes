import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { TicketUpdatedEvent } from "@myoshizumitickets/common";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
	// Create a listener
	const listener = new TicketUpdatedListener(natsWrapper.client);
	// Create and save a ticket
	const ticket = Ticket.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		title: "concert",
		price: 20,
	});
	await ticket.save();

	// Create a fake data object
	const data: TicketUpdatedEvent["data"] = {
		id: ticket.id,
		version: ticket.version + 1,
		title: "test concert",
		price: 999,
		userId: "tester",
	};

	// Create a fake msg object
	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	};
	// return all of this stuff
	return { listener, ticket, data, msg };
};

it("finds, updates, and saves a ticket", async () => {});

it("acks the message", async () => {});
