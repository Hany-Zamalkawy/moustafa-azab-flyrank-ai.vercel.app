/**
 * Clean Frontend API service layer for communicating with the Express backend
 */

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
  receivedAt?: string;
}

export interface HealthResponse {
  status: string;
  uptime: number;
  timestamp: string;
  service: string;
}

export const api = {
  /**
   * Check backend server health status
   */
  async getHealth(): Promise<HealthResponse | null> {
    try {
      const res = await fetch("/api/health");
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  /**
   * Submit contact / message to the backend
   */
  async sendContact(payload: ContactPayload): Promise<ContactResponse> {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return data;
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || "Failed to reach server. Please try again.",
      };
    }
  },
};
