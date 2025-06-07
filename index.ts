import { emailservice } from "./src/emailservice";
import { Provider1 } from "./src/provider/provider1";
import { Provider2 } from "./src/provider/provider2";
import { RateLimiter } from "./src/utils/ratelimit";
import { getStatusTracker } from "./src/emailservice";
import { mockEmails } from "./src/mocks/payload";

async function main() {
	// Mimicking fake providers
	const provider1 = new Provider1();
	const provider2 = new Provider2();

	//initialized email service for switching providers on failover.
	const service = new emailservice(provider1, provider2);

	//setup rate limiting for x requests in x sec.
	const rateLimitedSend = RateLimiter(2, 5000);

	// sending mock emails to test rate limiting, provider fallback, status tracking.
	for (const payload of mockEmails) {
		console.log(`Sending email with ID: ${payload.id}`);
		await rateLimitedSend(() => service.sendEmail(payload.id, payload));
	}

	getStatusTracker().saveToFile();
}

main();
