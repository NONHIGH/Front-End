import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('/api/open')) {
      return next.handle(request);
    }
    const token = localStorage.getItem('token');

    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(authRequest);
  }
}

