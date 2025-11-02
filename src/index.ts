import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { corsConfig } from './config/cors';

import citaRoutes from './routes/cita.routes';
import pacienteRoutes from './routes/paciente.routes';
import productoRoutes from './routes/producto.routes';
import empleadoRoutes from './routes/empleado.routes';
import habitacionRoutes from './routes/habitacion.routes';
import historialRoutes from './routes/historial.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

import { authMiddleware } from './middlewares/auth';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración de CORS
app.use(cors(corsConfig));

// Middlewares generales
app.use(express.json());

// Rutas públicas
app.get('/', (_req, res) => {
  res.send('✅ API de clínica corriendo. Usa /api/... para acceder a los módulos.');
});

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas protegidas por JWT
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/citas', authMiddleware, citaRoutes);
app.use('/api/pacientes', authMiddleware, pacienteRoutes);
app.use('/api/productos', authMiddleware, productoRoutes);
app.use('/api/empleados', authMiddleware, empleadoRoutes);
app.use('/api/habitaciones', authMiddleware, habitacionRoutes);
app.use('/api/historial', authMiddleware, historialRoutes);

// Endpoint para ver info del usuario logueado
app.get('/whoami', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});
