import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AuthenticationResponse } from 'src/app/models/authentication-response';
import { RequestLogin } from 'src/app/models/request-login';
import { RequestRegister } from 'src/app/models/request-register';

import { environment } from 'src/environment/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  api = environment.api;
  private idUsuarioSubject = new BehaviorSubject<string>('');
  idUsuario$: Observable<string> = this.idUsuarioSubject.asObservable();

  constructor(
    private readonly http: HttpClient, 
    private readonly router: Router) {
    const idSaved = localStorage.getItem('idUsuario');
    if(idSaved){
      this.idUsuarioSubject.next(idSaved);
    }
  }

  register(
    requestRegister: RequestRegister
  ): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(
        `${this.api}/open/register`,
        requestRegister,
        {
          observe: 'response',
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          const body = response.body;
          const token = body.token;
          localStorage.setItem('token', token);
          return body;
        })
      );
  }

  login(requestLogin: RequestLogin): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(
        `${this.api}/open/authenticate`,
        requestLogin,
        {
          observe: 'response',
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          const body = response.body;
          const token = body.token;
          localStorage.setItem('token', token);
          return body;
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogged(): boolean {
    return this.getToken() != null;
  }

  getIdUser(): string {
    return localStorage.getItem('idUsuario') ?? '';
  }
  setUserId(id: string) {
    localStorage.setItem('idUsuario', id);
    this.idUsuarioSubject.next(id);
  }

  initJwtExpiration(): void {
    const jwtExpiration = new Date().getTime() + 1000 * 60 * 60 * 24;
    localStorage.setItem('jwtExpiration', jwtExpiration.toString());
  }
  //Validacion del token si esta la sesion abierta
  isValidToken(){
    const jwtExpiration = localStorage.getItem('jwtExpiration');
    if(jwtExpiration){
      const jwtExpirationDate = new Date(jwtExpiration);
      if(new Date()> jwtExpirationDate){
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('jwtExpiration');
        localStorage.removeItem('token');
        this.router.navigate(['/home']);
      }
    }
  }
}
