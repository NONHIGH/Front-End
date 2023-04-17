import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environment/environments';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Persona } from 'src/app/models/persona.model';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private readonly http:HttpClient) { }

  ApiRest= environment.api;

  getUsers():Observable<Persona[]>{
    return this.http.get(`${this.ApiRest}/user/getAll`, { withCredentials: true })
      .pipe(
        map((response: any) => { // Cambiar el tipo de response a 'any' si no estás seguro de la estructura exacta de la respuesta del servidor
          // Mapear los datos del servidor a un array de objetos Usuario
          const users: Persona[] = response.map((data: any) => { // Cambiar el tipo de data a 'any' si no estás seguro de la estructura exacta de la respuesta del servidor
            return {
              id: data.id,
              nombre: data.nombre,
              apellido: data.apellido,
              imagen: data.imagen,
              expLab: data.expLab,
              educacion: data.educacion
            } as Persona; // Utilizar 'as Usuario' para indicar que el objeto mapeado es de tipo Usuario
          });
          return users;
        }),
        catchError((error: HttpErrorResponse) => {
          // Manejar el error de CORS
          if (error.status === 0) {
            console.error('Error de CORS: No se pudo conectar al servidor');
          } else {
            console.error('Otro error en la solicitud HTTP:', error);
          }
          // Lanzar un error observable para que el componente que llama pueda manejarlo
          return throwError(error);
        })
      );
  }
  getUser():Observable<Persona>{
    return this.http.get(`${this.ApiRest}/user/get/1`, { withCredentials: true })
      .pipe(
        map((response: any) => {
          return {
              id: response.id,
              nombre: response.nombre,
              apellido: response.apellido,
              imagen: response.imagen,
              expLab: response.expLab,
              educacion: response.educacion
            } as Persona; 
        }),
        catchError((error: HttpErrorResponse) => {
          // Manejar el error de CORS
          if (error.status === 0) {
            console.error('Error de CORS: No se pudo conectar al servidor');
          } else {
            console.error('Otro error en la solicitud HTTP:', error);
          }
          // Lanzar un error observable para que el componente que llama pueda manejarlo
          return throwError(error);
        })
      );
  }


}
