import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Backend API Routes ---

  // Health check endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: "HANY'S WORLD Portfolio API",
    });
  });

  // Profile data endpoint
  app.get("/api/profile", (_req: Request, res: Response) => {
    res.json({
      name: "Moustafa Hany Azab",
      alias: "HANY ZAMLKAWY",
      role: "Software Engineer",
      mission: "Code. Ship. Impact.",
      email: "moustfahhany5@gmail.com",
      focus: [
        "Software Engineer",
        "Full-Stack Developer",
        "Data Engineering",
        "AI Automation",
      ],
      socials: {
        github: "https://github.com/Hany-Zamalkawy",
        linkedin: "https://www.linkedin.com/in/moustafa-hany-45b0a331a/",
        whatsapp: "https://wa.me/201021464402",
        instagram: "https://www.instagram.com/moustafa__hanyy/",
        facebook: "https://www.facebook.com/share/1844i3xTpz/",
      },
    });
  });

  // Contact / Message submission endpoint
  app.post("/api/contact", (req: Request, res: Response) => {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, email, and message are required.",
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address format.",
      });
    }

    console.log(`[Contact API] Received message from ${name} (${email}): ${message.slice(0, 80)}...`);

    return res.json({
      success: true,
      message: "Your message has been received! Moustafa will respond to your inquiry shortly.",
      receivedAt: new Date().toISOString(),
    });
  });

  // --- Vite Frontend Middleware / Static Distribution ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
