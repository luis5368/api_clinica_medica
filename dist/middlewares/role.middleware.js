"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        const user = req.user; // Se asume que authMiddleware asigna req.user
        if (!user)
            return res.status(401).json({ message: 'No autorizado' });
        if (!roles.includes(user.role))
            return res.status(403).json({ message: 'Permiso denegado' });
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=role.middleware.js.map