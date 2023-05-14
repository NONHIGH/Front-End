import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from 'src/app/models/educacion.model';
import { Experiencia } from 'src/app/models/experiencia.model';
import { Persona } from 'src/app/models/persona.model';
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
  getUserImagenMain():Observable<Blob>{
    return this.http.get(`${this.api}/getUserImage`, { responseType:'blob' });
  }
  getEduMain():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.api}/mainEdu`);
  }

  getExpMain():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.api}/mainExp`);
  }
  getEduImagenMain(idEdu:number):Observable<Blob>{
    return this.http.get(`${this.api}/mainImageEdu/${idEdu}`, { responseType:'blob' });
  }
  getExpImagenMain(idExp:number):Observable<Blob>{
    return this.http.get(`${this.api}/mainImageExp/${idExp}`, { responseType:'blob' });
  }
}
