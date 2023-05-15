import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia.model';
import { environment } from 'src/environment/environments';
import { AuthenticationService } from '../auth/authentication.service';
import { Observable } from 'rxjs';
import { ResponseOk } from 'src/app/models/response-ok';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  
  api = environment.api + '/exp';
  idUsuario!:string;

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

  getExpOfUser(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(
      `${this.api}/getExperiences/${this.idUsuario}`
    );
  }


  getImageExp(idExp:number): Observable<ResponseOk> {
    return this.http.get<ResponseOk>(`${this.api}/getImageExp/${idExp}`);
  }

  postExp(form: Experiencia) {
    return this.http.post(`${this.api}/create/${this.idUsuario}/experiencia`,form);
  }

  editExp(form:Experiencia, idExp:number){
    return this.http.put(`${this.api}/edit/${this.idUsuario}/${idExp}`,form);
  }

  editImageExp(imagen:FormData, idExp:number){
    return this.http.put(`${this.api}/putImageExp/${idExp}`,imagen);
  }

  deleteExp(idExp:number){
    return this.http.delete(`${this.api}/deleteExp/${idExp}`);
  }
}
