"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const cors_1 = __importDefault(require("cors"));
const allowedOrigins = [
    "http://localhost:5173",
    "https://sweetmedicalstore.z1.web.core.windows.net",
    "https://sweetmedical-cdb7dnh2dcb3g8dd.westus3-01.azurewebsites.net" // ✅ agregar tu backend
];
exports.corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
};
exports.default = (0, cors_1.default)(exports.corsOptions);
//# sourceMappingURL=cors.js.map