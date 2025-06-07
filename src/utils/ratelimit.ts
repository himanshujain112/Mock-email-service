// Simple rate limiter to 'limit' executions per 'intervalMs' milliseconds
export function RateLimiter(limit: number, intervalMs: number) {
	let tokens = limit;
	const queue: (() => void)[] = [];

	setInterval(() => {
		tokens = limit;
		// Process queued tasks if tokens are available
		while (tokens > 0 && queue.length > 0) {
			const job = queue.shift();
			if (job) {
				tokens--;
				job();
			}
		}
	}, intervalMs);

	// Returns a wrapper to rate-limit async functions
	return function <T>(fn: () => Promise<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			const task = () => {
				fn().then(resolve).catch(reject);
			};

			if (tokens > 0) {
				tokens--;
				task();
			} else {
				queue.push(task);
			}
		});
	};
}
