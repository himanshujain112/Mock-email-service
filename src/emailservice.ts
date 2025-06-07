import { emailProvider } from "./provider/emailInterface";
import { retryWithBackoff } from "./utils/retryMech";
import { StatusTracker } from "./utils/statusTracker";

// Create a single instance of StatusTracker to track email statuses
const tracker = new StatusTracker();

// Email service class setup
export class emailservice {
	private sentEmailIds: Set<string> = new Set(); // Track sent email IDs to avoid duplicates

	constructor(
		private provider1: emailProvider, // Primary email provider
		private provider2: emailProvider // Secondary email provider (fallback)
	) {}

	async sendEmail(
		id: string,
		payload: {
			to: string;
			subject: string;
			body: string;
		}
	): Promise<void> {
		// Skip sending if this email ID has already been processed
		if (this.sentEmailIds.has(id)) {
			console.log(`Email with ID: ${id} already sent. Skipping.`);
			tracker.record({
				id,
				to: payload.to,
				status: "skipped",
				attempts: 0,
				timestamp: new Date().toISOString(),
			});
			return;
		}

		try {
			// Try sending with Provider 1 (primary), with retries
			await retryWithBackoff(() => this.provider1.sendEmail(payload), 3, 1000);
			this.sentEmailIds.add(id);
			tracker.record({
				id,
				to: payload.to,
				status: "success",
				provider: "Provider1",
				attempts: 1,
				timestamp: new Date().toISOString(),
			});
			console.log(`Email sent successfully using Provider 1 to ${id}!`);
			return;
		} catch (error) {
			// If Provider 1 fails, record the failure and try Provider 2
			console.warn("Email Provider1 failed. Retrying with Provider 2!");
			tracker.record({
				id,
				to: payload.to,
				status: "failed",
				provider: "Provider1",
				attempts: 1,
				timestamp: new Date().toISOString(),
				error: (error as Error).message,
			});
		}

		try {
			// Try sending with Provider 2 (secondary), with retries
			await retryWithBackoff(() => this.provider2.sendEmail(payload), 3, 1000);
			this.sentEmailIds.add(id);
			console.log(`Email sent successfully using Provider 2 to ${id}!`);
			tracker.record({
				id,
				to: payload.to,
				status: "success",
				provider: "Provider2",
				attempts: 1,
				timestamp: new Date().toISOString(),
			});
			return;
		} catch (error) {
			// If Provider 2 also fails, record the failure
			console.warn("Email Provider 2 also failed.");
			tracker.record({
				id,
				to: payload.to,
				status: "failed",
				provider: "Provider2",
				attempts: 1,
				timestamp: new Date().toISOString(),
				error: (error as Error).message,
			});
		}
	}
}
export function getStatusTracker() {
	return tracker;
}
