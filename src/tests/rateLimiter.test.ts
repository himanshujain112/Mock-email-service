import { RateLimiter } from "../utils/ratelimit";

jest.useFakeTimers();

test("RateLimiter should limit function calls", async () => {
	const limiter = RateLimiter(2, 1000); // 2 calls per second
	const mockFunction = jest.fn(async () => "Success");

	await limiter(mockFunction);
	await limiter(mockFunction);
	const third = limiter(mockFunction);

	expect(mockFunction).toHaveBeenCalledTimes(2);

	jest.advanceTimersByTime(1000); // Fast-forward time by 1 second
	await third; // Wait for the third call to resolve

	expect(mockFunction).toHaveBeenCalledTimes(3);
});
