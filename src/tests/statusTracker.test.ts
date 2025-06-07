import { StatusTracker } from "../utils/statusTracker";

test("StatusTracker should track status changes", () => {
	const tracker = new StatusTracker();
	const testStatus = {
		id: "1",
		to: "test@himanshu.com",
		status: "success" as "success" | "failed" | "skipped",
		provider: "testProvider",
		attempts: 1,
		timestamp: new Date().toISOString(),
		error: "undefined",
	};

	tracker.record(testStatus);
	expect(tracker.getAll()).toContainEqual(testStatus);
	tracker.saveToFile("test_status_log.json");
});
