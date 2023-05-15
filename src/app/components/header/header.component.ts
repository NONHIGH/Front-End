import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { EditService } from 'src/app/services/edit/edit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(readonly editService:EditService, readonly authService:AuthenticationService, private readonly router:Router){
  }

  logOut(){
    localStorage.removeItem('jwtExpiration');
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
  }

  editMode(){
    this.editService.enableEditMode();
  }
  disableEditMode(){
    this.editService.disableEditMode();
  }

  toLogin(){
    this.router.navigate(['/login']);
  }
  toRegister(){
    this.router.navigate(['/register']);
  }
}
