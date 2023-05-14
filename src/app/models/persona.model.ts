import { Educacion } from "./educacion.model";
import { Experiencia } from "./experiencia.model";

export class Persona{
    id!:number; 
    nombre!:string;
    apellido!: string;
    descripcion!:string;
    titulo!:string;
    imagen!: string;
    expLab!: Experiencia[];
    educacion!: Educacion[];
    
}