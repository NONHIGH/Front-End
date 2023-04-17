import { Educacion } from "./educacion.model";
import { Experiencia } from "./experiencia.model";

export class Persona{
    map(arg0: (data: any) => Persona): Persona {
      throw new Error('Method not implemented.');
    }
    id!:number; 
    nombre!:string;
    apellido!: string;
    imagen!: string;
    expLab!: Experiencia[];
    educacion!: Educacion[];
}