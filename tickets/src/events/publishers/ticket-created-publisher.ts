import {
	Publisher,
	Subjects,
	TicketCreatedEvent,
} from "@myoshizumitickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
