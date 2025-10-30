"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const db_1 = require("../db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUsers = async (req, res) => {
    try {
        const currentUser = req.user;
        const pool = await db_1.poolPromise;
        if (currentUser.role === 'superadmin') {
            const result = await pool.request()
                .input('superId', currentUser.id)
                .query(`
          SELECT 
            u.id, u.username, u.role, u.created_by,
            c.username AS created_by_username
          FROM users u
          LEFT JOIN users c ON u.created_by = c.id
          WHERE u.created_by = @superId OR u.created_by IN (
            SELECT id FROM users WHERE created_by = @superId AND role = 'admin'
          )
        `);
            res.json(result.recordset);
            return;
        }
        if (currentUser.role === 'admin') {
            const result = await pool.request()
                .input('creatorId', currentUser.id)
                .query(`
          SELECT 
            u.id, u.username, u.role, u.created_by,
            c.username AS created_by_username
          FROM users u
          LEFT JOIN users c ON u.created_by = c.id
          WHERE u.created_by = @creatorId
        `);
            res.json(result.recordset);
            return;
        }
        if (['medico', 'enfermero', 'recepcionista'].includes(currentUser.role)) {
            const result = await pool.request()
                .input('userId', currentUser.id)
                .query('SELECT id, username, role, created_by FROM users WHERE id = @userId');
            res.json(result.recordset);
            return;
        }
        res.status(403).json({ error: 'No autorizado para ver usuarios' });
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Faltan campos obligatorios' });
            return;
        }
        const newRole = role || 'recepcionista';
        const pool = await db_1.poolPromise;
        const existe = await pool.request()
            .input('username', username)
            .query('SELECT * FROM users WHERE username = @username');
        if (existe.recordset.length > 0) {
            res.status(409).json({ error: 'El usuario ya existe' });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        let createdBy = req.user ? req.user.id : null;
        await pool.request()
            .input('username', username)
            .input('passwordHash', hashedPassword)
            .input('role', newRole)
            .input('created_by', createdBy)
            .query(`
        INSERT INTO users (username, passwordHash, role, created_by)
        VALUES (@username, @passwordHash, @role, @created_by)
      `);
        res.status(201).json({ message: 'Usuario creado correctamente' });
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};
exports.createUser = createUser;
//# sourceMappingURL=user.controller.js.map