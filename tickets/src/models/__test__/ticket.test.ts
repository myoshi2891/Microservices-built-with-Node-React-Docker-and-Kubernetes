import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
	// Create an instance of ticket
	const ticket = Ticket.build({
		title: "concert",
		price: 20,
		userId: "testuser",
	});
	// Save the ticket to the database
	await ticket.save();

	// fetch the ticket twice
	const firstInstance = await Ticket.findById(ticket.id);
	const secondInstance = await Ticket.findById(ticket.id);

	// make two seprate changes to the tickets we fetched
	firstInstance!.set({ price: 10 });
	secondInstance!.set({ price: 15 });

	// save the first fetched ticket
	await firstInstance!.save();

	// save the second fetched ticket and expect an error
	try {
		await secondInstance!.save();
	} catch (err) {
		return;
	}

	throw new Error("Should not reach this point");
});
