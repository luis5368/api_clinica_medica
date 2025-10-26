import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import citaRoutes from './routes/cita.routes';
import pacienteRoutes from './routes/paciente.routes';
import productoRoutes from './routes/producto.routes';
//import empleadoRoutes from './routes/empleado.routes';
//import habitacionRoutes from './routes/habitacion.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { authMiddleware } from './middlewares/auth';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares generales
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas protegidas por JWT
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/citas', authMiddleware, citaRoutes);
app.use('/api/pacientes', authMiddleware, pacienteRoutes);
app.use('/api/productos', authMiddleware, productoRoutes);
//app.use('/api/empleados', authMiddleware, empleadoRoutes);
//app.use('/api/habitaciones', authMiddleware, habitacionRoutes);

// Rutas públicas
app.get('/', (_req, res) => {
  res.send('API de clínica: punto de inicio. Usa /api/... para acceder a los módulos');
});

// Endpoint para ver info del usuario logueado
app.get('/whoami', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
