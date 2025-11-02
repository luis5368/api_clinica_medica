
// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { poolPromise } from '../db';
import sql from 'mssql';
import { Role } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Login con token único
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: 'Faltan credenciales' });
      return;
    }

    const pool = await poolPromise;
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM users WHERE username = @username');

    const user = result.recordset[0];
    if (!user) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    // Guardar token activo, invalidando cualquier sesión previa
    await pool.request()
      .input('userId', sql.Int, user.id)
      .input('activeToken', sql.VarChar, token)
      .query('UPDATE users SET activeToken = @activeToken WHERE id = @userId');

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
      user: { id: user.id, username: user.username, role: user.role, panelRoute }
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

// Registro users
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      res.status(400).json({ error: 'Faltan campos' });
      return;
    }

    const pool = await poolPromise;

    const exists = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM users WHERE username = @username');

    if (exists.recordset.length > 0) {
      res.status(400).json({ error: 'Usuario ya existe' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashedPassword)
      .input('role', sql.VarChar, role)
      .query('INSERT INTO users (username, passwordHash, role) VALUES (@username, @password, @role)');

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Register error:', error);
    next(error);
  }
};