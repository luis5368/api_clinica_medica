// src/config/cors.ts
import { CorsOptions } from "cors";

const allowedOrigins = [
  "http://localhost:5173", // Vite local
  process.env.FRONTEND_URL!, // Azure Static Web App
];

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`❌ CORS: Origin not allowed => ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
