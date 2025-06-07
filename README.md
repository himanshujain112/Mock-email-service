# Mock Email Sending Service (TypeScript)

This project is a robust, fault-tolerant email sending service built with TypeScript. It demonstrates production-ready patterns like retries, fallback mechanisms, rate limiting, idempotency, and status tracking using mocked email providers.

✅ Made as part of the internship assignment for PearlThoughts | Backend Developer Trainee Position.

## 🚀 Features

- **Retry Mechanism** with Exponential Backoff
- **Fallback** to Secondary Provider if the First Fails
- **Idempotency**: Avoid Duplicate Sends
- **Rate Limiting**: Control Throughput
- **Status Tracking**: Track and Log Each Attempt

## 🔧 Setup Instructions

1. **Install dependencies**:

```bash
npm install
```

2. **Compile TypeScript**:

```bash
npx tsc
```

3. **Run the demo**:

```bash
npm start
```

## 🧪 Unit Tests

Basic unit tests are included to validate:

- Retry behavior
- Idempotency check
- Rate limiting

Run them using a test runner like `jest`.

```bash
npm test
```

## 📘 Assumptions

- Email sending is mocked; no real API calls
- Duplicate detection uses email ID (`string`)
- Rate limit is configurable via `RateLimiter(limit, interval)`
- Status logs are written to `email_status_log.json`

## 🧠 Learnings & Design Choices

- Followed **SOLID principles** for extensibility
- Separated concerns into utils and provider
- Ensured clarity via types and comments
- Focused on testability and real-world use patterns

## 📂 Sample Payload

```ts
{
  id: "A123",
  to: "user@example.com",
  subject: "Hello!",
  body: "Welcome to the mock mail service."
}
```

## 📄 Status Log Example

```json
{
	"id": "A123",
	"to": "user@example.com",
	"status": "success",
	"provider": "Provider1",
	"attempts": 2,
	"timestamp": "2025-06-07T14:15:30.000Z"
}
```

## 📞 Contact

Built by Himanshu Jain — [debuglife.fun](https://debuglife.fun)

---
