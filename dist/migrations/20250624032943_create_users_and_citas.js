"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('username', 255).notNullable().unique();
        table.string('passwordHash', 255).notNullable();
        table.string('role', 50).notNullable();
    });
    await knex.schema.createTable('citas', table => {
        table.increments('id').primary();
        table.string('paciente', 255).notNullable();
        table.date('fecha').notNullable();
        table.string('motivo', 255).notNullable();
    });
}
async function down(knex) {
    await knex.schema.dropTableIfExists('citas');
    await knex.schema.dropTableIfExists('users');
}
//# sourceMappingURL=20250624032943_create_users_and_citas.js.map