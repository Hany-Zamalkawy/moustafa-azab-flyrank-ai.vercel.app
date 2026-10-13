type ContactRequest = {
  method?: string;
  body?: {
    name?: unknown;
    email?: unknown;
    message?: unknown;
  };
};

type ApiResponse = {
  status(code: number): ApiResponse;
  json(value: unknown): void;
};

export default function handler(request: ContactRequest, response: ApiResponse) {
  if (request.method !== "POST") {
    return response.status(405).json({ success: false, error: "Method not allowed." });
  }

  const { name, email, message } = request.body ?? {};
  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.trim() || typeof message !== "string" || !message.trim()) {
    return response.status(400).json({
      success: false,
      error: "Missing required fields: name, email, and message are required.",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ success: false, error: "Invalid email address format." });
  }

  console.log(`[Contact API] Received message from ${name} (${email}): ${message.slice(0, 80)}...`);
  return response.json({
    success: true,
    message: "Your message has been received! Moustafa will respond to your inquiry shortly.",
    receivedAt: new Date().toISOString(),
  });
}
