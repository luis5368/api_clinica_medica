"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolPromise = void 0;
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Se separa el host y la instancia si existe
const [server, instanceName] = process.env.DB_HOST?.split('\\') || [];
// Configuración para MSSQL
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: server || 'localhost',
    port: parseInt(process.env.DB_PORT || '1433'),
    database: process.env.DB_NAME,
    options: {
        trustServerCertificate: true,
        encrypt: true,
        ...(instanceName && { instanceName }),
    },
    connectionTimeout: 30000,
    requestTimeout: 30000,
};
// Exporta la promesa de conexión
exports.poolPromise = mssql_1.default.connect(dbConfig);
//# sourceMappingURL=db.js.map