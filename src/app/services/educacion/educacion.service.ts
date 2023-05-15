import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from 'src/app/models/educacion.model';
import { environment } from 'src/environment/environments';
import { AuthenticationService } from '../auth/authentication.service';
import { ResponseOk } from 'src/app/models/response-ok';

@Injectable({
  providedIn: 'root',
})
export class EducacionService {

  api = environment.api + '/edu';
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

  getEducacionOfUser(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(
      `${this.api}/getEducations/${this.idUsuario}`
    );
  }


  getImageEdu(idEdu:number): Observable<ResponseOk> {
    return this.http.get<ResponseOk>(`${this.api}/getImageEdu/${idEdu}`);
  }

  postEdu(form: Educacion) {
    return this.http.post(`${this.api}/create/${this.idUsuario}/educacion`,form);
  }

  editEdu(form:Educacion, idEdu:number){
    return this.http.put(`${this.api}/edit/${this.idUsuario}/${idEdu}`,form);
  }

  editImageEdu(imagen:FormData, idEdu:number){
    return this.http.put(`${this.api}/putImageEdu/${idEdu}`,imagen);
  }

  deleteEdu(idEdu:number){
    return this.http.delete(`${this.api}/delete/${idEdu}`);
  }

}
