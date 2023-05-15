import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { Persona } from 'src/app/models/persona.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environments';
import { ResponseOk } from 'src/app/models/response-ok';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {

  idUsuario!: string;
  api = environment.api + '/user';

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthenticationService
  ) {
    this.authService.idUsuario$.subscribe({
      next: (idUsuario) => {
        this.idUsuario = idUsuario;
      },
    });
  }

  getUserById(): Observable<Persona> {
    return this.http.get<Persona>(`${this.api}/getUser/${this.idUsuario}`);
  }

  getUserImage():Observable<ResponseOk> {
    return this.http.get<ResponseOk>(`${this.api}/getUserImage/${this.idUsuario}`)
  }




  editDescripcion(value:string):Observable<ResponseOk>{
    return this.http.put<any>(`${this.api}/editDescripcion/${this.idUsuario}`,value);
  }
  editUsername(value:string):Observable<ResponseOk>{
    return this.http.put<any>(`${this.api}/putUserName/${this.idUsuario}`,value);
  }
  editUserLastname(value:string):Observable<ResponseOk>{
    return this.http.put<any>(`${this.api}/putUserLastName/${this.idUsuario}`,value);
  }
  editUserTitle(value:string):Observable<ResponseOk>{
    return this.http.put<any>(`${this.api}/editTitulo/${this.idUsuario}`,value);
  }
  putUserImage(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', imagen);
  
    return this.http.put<any>(`${this.api}/putUserImage/${this.idUsuario}`, formData);
  }
  
}
