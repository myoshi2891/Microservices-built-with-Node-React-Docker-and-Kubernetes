import {
	Subjects,
	Publisher,
	PaymentCreatedEvent,
} from "@myoshizumitickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
	subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
