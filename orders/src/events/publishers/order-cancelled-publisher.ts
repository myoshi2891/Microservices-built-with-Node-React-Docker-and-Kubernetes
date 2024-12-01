import {
	Subjects,
	Publisher,
	OrderCancelledEvent,
} from "@myoshizumitickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
