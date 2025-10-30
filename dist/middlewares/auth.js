"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.requireRoles = requireRoles;
exports.requirePermission = requirePermission;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
// Middleware para autenticar token
function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) {
        res.status(401).json({ error: 'No autorizado' });
        return;
    }
    const [, token] = auth.split(' ');
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    }
    catch {
        res.status(401).json({ error: 'Token inválido' });
        return;
    }
}
// Middleware para roles estáticos
function requireRoles(roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ error: 'Permiso denegado' });
            return;
        }
        next();
    };
}
// Middleware para permisos dinámicos desde DB
function requirePermission(permission) {
    return (req, res, next) => {
        if (!req.user || !req.user.permissions?.includes(permission)) {
            res.status(403).json({ error: 'Permiso denegado' });
            return;
        }
        next();
    };
}
//# sourceMappingURL=auth.js.map