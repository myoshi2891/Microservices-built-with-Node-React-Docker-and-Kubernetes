import {
	Listener,
	OrderCreatedEvent,
	Subjects,
} from "@myoshizumitickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	subjects: Subjects.OrderCreated = Subjects.OrderCreated;
	queueGroupName = queueGroupName;
	async onMessage(data: OrderCreatedEvent["data"], msg: Message) {}
}
