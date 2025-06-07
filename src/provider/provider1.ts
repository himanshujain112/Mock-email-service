import { emailProvider, emailPayload } from "./emailInterface";

// Provider 1 class
class Provider1 implements emailProvider {
	name = "Provider1";
	async sendEmail(payload: emailPayload): Promise<void> {
		console.log(`Sending email using ${this.name}`);

		// mimic 80% success rate.
		const success = Math.random() > 0.2;

		if (!success) {
			throw new Error("Failed to send email");
		}

		console.log(`Email sent to ${payload.to} from ${this.name}`);
	}
}

export { Provider1 };
