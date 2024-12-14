import {
	Subjects,
	Publisher,
	ExpirationCompleteEvent,
} from "@myoshizumitickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
	subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
