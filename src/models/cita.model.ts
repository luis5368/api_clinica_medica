export interface Cita {
  id: number;               // ID de la cita
  paciente: string;         // nombre completo del paciente
  empleado: string;         // nombre completo del empleado
  fecha: string;            
  hora: string | null;      
  motivo: string | null;    
  id_paciente: number;      // id real del paciente
  id_empleado: number | null; // id real del empleado
}

export const citas: Cita[] = [];
