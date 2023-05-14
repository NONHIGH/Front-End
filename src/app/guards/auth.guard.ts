import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLogged()) {
      // El usuario ya inició sesión, no permitir el acceso a las páginas de login y register
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
