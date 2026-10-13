type ApiResponse = {
  status(code: number): ApiResponse;
  json(value: unknown): void;
};

export default function handler(_request: unknown, response: ApiResponse) {
  response.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: "HANY'S WORLD Portfolio API",
  });
}
