import { retryWithBackoff } from "../utils/retryMech";

test("retryWithBackoff should retry the function with exponential backoff", async () => {
	let attempts = 0;
	const mockFunction = jest.fn(async () => {
		attempts++;
		if (attempts < 3) {
			throw new Error("Temporary failure");
		}
		return "Success";
	});
	const result = await retryWithBackoff(mockFunction, 5, 100);
	expect(mockFunction).toHaveBeenCalledTimes(3);
	expect(result).toBe("Success");
});
