import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import {
	OrderStatus,
	ExpirationCompleteEvent,
} from "@myoshizumitickets/common";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Order } from "../../../models/order";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
	const listener = new ExpirationCompleteListener(natsWrapper.client);

	const ticket = Ticket.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		title: "concert",
		price: 20,
	});

	await ticket.save();

	const order = Order.build({
		ticket,
		userId: "testuser",
		status: OrderStatus.Created,
		expiresAt: new Date(),
	});

	await order.save();

	const data: ExpirationCompleteEvent["data"] = {
		orderId: order.id,
	};

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	};

	return { listener, ticket, order, data, msg };
};
