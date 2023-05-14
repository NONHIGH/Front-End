import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ResponseOk } from 'src/app/models/response-ok';
import { Persona } from 'src/app/models/persona.model';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { EditService } from 'src/app/services/edit/edit.service';
import { MainService } from 'src/app/services/notAuth/main.service';
import { PersonaService } from 'src/app/services/persona/persona.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {
  user?: Persona;
  imagen?: SafeUrl;

  imagenEdicion?: any;

  idUsuario!: string;
  imagenfile?: File;

  constructor(
    private readonly mainService: MainService,
    private readonly personaService: PersonaService,
    private readonly authService: AuthenticationService,
    private readonly sanitizer: DomSanitizer,
    readonly editService: EditService,
    private readonly toast: ToastrService
  ) {}
  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.authService.isValidToken();
      this.initUserLogged();
    } else {
      this.initUserMain();
    }
  }

  up() {
    const btnUp = document.querySelector('#btnUp');
    btnUp?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  initUserMain() {
    this.mainService.getUserMain().subscribe({
      next: (user) => {
        this.user = user;
        this.mainService.getUserImagenMain().subscribe({
          next: (imagen) => {
            const blob = new Blob([imagen], { type: 'image/png' });
            const url = URL.createObjectURL(blob);
            this.imagen = this.sanitizer.bypassSecurityTrustUrl(url);
          },
        });
      },
    });
  }

  initUserLogged() {
    this.personaService.getUserById().subscribe({
      next: (next) => {
        this.user = next;
        this.personaService.getUserImage().subscribe((response) => {
          const blob = new Blob([response], { type: 'image/png' });
          const url = URL.createObjectURL(blob);
          this.imagen = this.sanitizer.bypassSecurityTrustUrl(url);
        });
      },
    });
  }

  editDescripcion(value: string) {
    this.personaService.editDescripcion(value).subscribe({
      next: (message: ResponseOk) => {
        this.toast.info(message.message, 'Usuario', { timeOut: 4000 });
        this.initUserLogged();
      },
      error: () => {
        this.toast.error('No se edito la descripcion', 'Usuario', {
          timeOut: 4000,
        });
      },
    });
  }
  editUsername(value: string) {
    this.personaService.editUsername(value).subscribe({
      next: (message: ResponseOk) => {
        this.toast.info(message.message, 'Usuario', { timeOut: 4000 });
        this.initUserLogged();
      },
      error: () => {
        this.toast.error('No se edito el nombre de usuario', 'Usuario', {
          timeOut: 4000,
        });
      },
    });
  }
  editUserLastname(value: string) {
    this.personaService.editUserLastname(value).subscribe({
      next: (message: ResponseOk) => {
        this.toast.info(message.message, 'Usuario', { timeOut: 4000 });
        this.initUserLogged();
      },
      error: () => {
        this.toast.error('No se edito el apellido', 'Usuario', {
          timeOut: 4000,
        });
      },
    });
  }
  editUserTitle(value: string) {
    this.personaService.editUserTitle(value).subscribe({
      next: (message: ResponseOk) => {
        this.toast.info(message.message, 'Usuario', { timeOut: 4000 });
        this.initUserLogged();
      },
      error: () => {
        this.toast.error('No se edito el titulo', 'Usuario', { timeOut: 4000 });
      },
    });
  }

  onFileChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.imagenfile = files[0];
    } else {
      this.imagenfile = undefined;
    }
  }

  editUserImage() {
    if (!this.imagenfile) {
      this.toast.warning('Ingrese una imagen', 'Usuario', { timeOut: 10000 });
    }

    const userImage = new FormData();
    userImage.append('imagen', this.imagenfile!);
    this.personaService.putUserImage(userImage!).subscribe({
      next: () => {
        this.toast.info('Se ha actualizado su foto de perfil', 'Usuario', {
          timeOut: 5000,
        });
        this.initUserLogged();
      },
      error: () => {
        this.toast.error(
          'Ha ocurrido un error al intentar editar la imagen',
          'Usuario',
          { timeOut: 4000 }
        );
      },
    });
  }
}
