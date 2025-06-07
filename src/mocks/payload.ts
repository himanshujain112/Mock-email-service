//Mock payload
export const mockEmails = [
	{
		id: "A123",
		to: "himanshu@gmail.com",
		subject: "Hello world!",
		body: "This is a test message",
	},
	{
		id: "A13",
		to: "him@gmail.com",
		subject: "Hello again!",
		body: "This is another test message",
	},
	{
		id: "A124",
		to: "jainsahab@gmail.com",
		subject: "Hello Earth!",
		body: "This is a test message !!!",
	},
	{
		id: "A124", // Duplicate ID to show idempotency
		to: "jainsahab@gmail.com",
		subject: "Duplicate ID test",
		body: "Should not resend this.",
	},
	{
		id: "A125",
		to: "Himanshujain@gmail.com",
		subject: "Another test email",
		body: "This is yet another test message",
	},
];
