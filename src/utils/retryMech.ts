// retryWithBackoff: Retries an async function with exponential backoff on failure.
export async function retryWithBackoff<T>(
	func: () => Promise<T>,
	retries: number = 3,
	delay: number = 1000
): Promise<T> {
	for (let i = 0; i < retries; i++) {
		try {
			// Try executing the function
			return await func();
		} catch (error) {
			// If last attempt, rethrow the error
			if (i === retries - 1) throw error;

			// Calculate backoff delay
			const backOffDelay = delay * Math.pow(2, i);
			console.warn(`Attempt ${i + 1} failed. Retrying in ${backOffDelay}ms...`);

			// Wait for the backoff delay before retrying
			await new Promise((resolve) => setTimeout(resolve, backOffDelay));
		}
	}
	// If all retries fail, throw a generic error
	throw new Error("All retry attempts failed.");
}
