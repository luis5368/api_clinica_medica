"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function seed(knex) {
    await knex('users').del();
    const hash = await bcryptjs_1.default.hash('admin123', 10);
    await knex('users').insert([
        {
            username: 'admin',
            passwordHash: hash,
            role: 'admin'
        }
    ]);
    console.log('✅ Usuario admin seeded con hash:', hash);
}
//# sourceMappingURL=01_users_seed.js.map