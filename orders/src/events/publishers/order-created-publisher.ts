import {
	Publisher,
	OrderCreatedEvent,
	Subjects,
} from "@myoshizumitickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
