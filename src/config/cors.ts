// src/config/cors.ts
import { CorsOptions } from "cors";
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://sweetmedicalstore.z1.web.core.windows.net",
  "https://sweetmedical-cdb7dnh2dcb3g8dd.westus3-01.azurewebsites.net" // ✅ agregar tu backend
];

export const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
