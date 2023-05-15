import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from 'src/app/models/educacion.model';
import { Experiencia } from 'src/app/models/experiencia.model';
import { Persona } from 'src/app/models/persona.model';
import { ResponseOk } from 'src/app/models/response-ok';
import { environment } from 'src/environment/environments';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  api = `${environment.api}/open`;
  constructor(private readonly http:HttpClient) {}

  getUserMain():Observable<Persona>{
    return this.http.get<Persona>(`${this.api}/main`);
  }
  getUserImagenMain():Observable<ResponseOk>{
    return this.http.get<ResponseOk>(`${this.api}/getUserImage`);
  }
  getEduMain():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.api}/mainEdu`);
  }

  getExpMain():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.api}/mainExp`);
  }
  getEduImagenMain(idEdu:number):Observable<ResponseOk>{
    return this.http.get<ResponseOk>(`${this.api}/mainImageEdu/${idEdu}`);
  }
  getExpImagenMain(idExp:number):Observable<ResponseOk>{
    return this.http.get<ResponseOk>(`${this.api}/mainImageExp/${idExp}`);
  }
}
