// Interface for an email provider
interface emailProvider {
	name: string; // Provider's Name
	sendEmail: (payload: emailPayload) => Promise<void>; // Method to send email
}

// Payload structure for sending an email
interface emailPayload {
	to: string; // Recipient email address
	subject: string; // Email subject
	body: string; // Email body content
}

export { emailProvider, emailPayload };
