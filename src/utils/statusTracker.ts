import * as fs from "fs";

// Define the shape of a single email's status record
export type EmailStatus = {
	id: string; // Unique ID for the email (for idempotency)
	to: string; // receiver email address
	status: "success" | "failed" | "skipped"; // Final status of the email
	provider?: string; // Which provider was used
	attempts: number; // Total number of retry attempts made
	timestamp: string; // When the status was recorded
	error?: string; // Error message (if failed)
};

// This class tracks the status of all email send attempts
export class StatusTracker {
	private statusMap: Map<string, EmailStatus> = new Map();

	// Records (or updates) the status of a particular email by its ID
	record(status: EmailStatus): void {
		this.statusMap.set(status.id, status);
	}

	// Returns all status records as an array
	getAll(): EmailStatus[] {
		return Array.from(this.statusMap.values());
	}

	// Saves all recorded statuses to a JSON file for logging/auditing
	saveToFile(fileName = "email_status_log.json") {
		const data = JSON.stringify(this.getAll(), null, 2);

		fs.writeFileSync(fileName, data, "utf-8");
		console.log(`Status log saved to ${fileName}`);
	}
}
