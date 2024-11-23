import {
	Publisher,
	Subjects,
	TicketUpdatedEvent,
} from "@myoshizumitickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
