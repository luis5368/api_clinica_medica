"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("./config/cors"));
const cita_routes_1 = __importDefault(require("./routes/cita.routes"));
const paciente_routes_1 = __importDefault(require("./routes/paciente.routes"));
const producto_routes_1 = __importDefault(require("./routes/producto.routes"));
//import empleadoRoutes from './routes/empleado.routes';
//import habitacionRoutes from './routes/habitacion.routes';
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_1 = require("./middlewares/auth");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Configuración de CORS
app.use(cors_1.default);
// Middlewares generales
app.use(express_1.default.json());
// Rutas de autenticación
app.use('/auth', auth_routes_1.default);
// Rutas protegidas por JWT
app.use('/api/users', auth_1.authMiddleware, user_routes_1.default);
app.use('/api/citas', auth_1.authMiddleware, cita_routes_1.default);
app.use('/api/pacientes', auth_1.authMiddleware, paciente_routes_1.default);
app.use('/api/productos', auth_1.authMiddleware, producto_routes_1.default);
//app.use('/api/empleados', authMiddleware, empleadoRoutes);
//app.use('/api/habitaciones', authMiddleware, habitacionRoutes);
// Rutas públicas
app.get('/', (_req, res) => {
    res.send('API de clínica: punto de inicio. Usa /api/... para acceder a los módulos');
});
// Endpoint para ver info del usuario logueado
app.get('/whoami', auth_1.authMiddleware, (req, res) => {
    res.json({ user: req.user });
});
// Middleware de manejo de errores
app.use(errorHandler_1.errorHandler);
// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map