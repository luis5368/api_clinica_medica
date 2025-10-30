"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const mssql_1 = __importDefault(require("mssql"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
// Login
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Faltan credenciales' });
            return;
        }
        const pool = await db_1.poolPromise;
        const result = await pool.request()
            .input('username', mssql_1.default.VarChar, username)
            .query('SELECT * FROM users WHERE username = @username');
        const user = result.recordset[0];
        if (!user) {
            res.status(401).json({ error: 'Credenciales inválidas' });
            return;
        }
        const isValid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isValid) {
            res.status(401).json({ error: 'Credenciales inválidas' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        // Redirección lógica basada en rol
        let panelRoute = '';
        switch (user.role) {
            case 'superadmin':
            case 'admin':
                panelRoute = '/admin/panel';
                break;
            case 'recepcionista':
                panelRoute = '/recepcionista/panel';
                break;
            case 'medico':
                panelRoute = '/medico/panel';
                break;
            case 'enfermero':
                panelRoute = '/enfermero/panel';
                break;
            default:
                panelRoute = '/dashboard';
        }
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                panelRoute
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        next(error);
    }
};
exports.login = login;
// Registro users
const register = async (req, res, next) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            res.status(400).json({ error: 'Faltan campos' });
            return;
        }
        const pool = await db_1.poolPromise;
        // Verificar si ya existe usuario
        const exists = await pool.request()
            .input('username', mssql_1.default.VarChar, username)
            .query('SELECT * FROM users WHERE username = @username');
        if (exists.recordset.length > 0) {
            res.status(400).json({ error: 'Usuario ya existe' });
            return;
        }
        // Hashear contraseña
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Insertar nuevo usuario
        await pool.request()
            .input('username', mssql_1.default.VarChar, username)
            .input('password', mssql_1.default.VarChar, hashedPassword)
            .input('role', mssql_1.default.VarChar, role)
            .query('INSERT INTO users (username, passwordHash, role) VALUES (@username, @password, @role)');
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    }
    catch (error) {
        console.error('Register error:', error);
        next(error);
    }
};
exports.register = register;
//# sourceMappingURL=auth.controller.js.map