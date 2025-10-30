"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    development: {
        client: 'mssql',
        connection: {
            server: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : 'localhost',
            port: Number((_b = process.env.DB_PORT) !== null && _b !== void 0 ? _b : '1433'),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            options: {
                enableArithAbort: true,
                encrypt: false
            }
        },
        migrations: { directory: './migrations' },
        seeds: { directory: './src/seeds' }
    }
};
exports.default = config;
