// src/models/user.model.ts
export type Role = 'superadmin' | 'admin' | 'recepcionista' | 'medico' | 'enfermero';

export interface User {
  id: number;
  username: string;
  passwordHash: string;
  role: Role;
  created_by?: number | null;
}
