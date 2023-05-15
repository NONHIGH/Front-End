import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Experiencia } from 'src/app/models/experiencia.model';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { EditService } from 'src/app/services/edit/edit.service';
import { ExperienciaService } from 'src/app/services/experiencia/experiencia.service';
import { MainService } from 'src/app/services/notAuth/main.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  experiencias: Experiencia[] = [];
  imagenes: string[] = [];
  formExp!: FormGroup;
  expSeleccionada: Experiencia | null = null;

  constructor(
    private readonly expService: ExperienciaService,
    private readonly mainService: MainService,
    private readonly toast: ToastrService,
    private readonly authService: AuthenticationService,
    private readonly sanitizer: DomSanitizer,
    readonly editService: EditService,
    private readonly fB: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.authService.isLogged()) {
      this.initExpUser();
      this.initForm();
    } else {
      this.initExpMain();
    }
  }
  initForm() {
    return this.fB.group({
      lugarTrabajo: ['', Validators.required],
      tituloTrabajo: ['', Validators.required],
      fechaInicio: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      fechaFinalizacion: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
    });
  }
  seleccionarExp(exp: Experiencia) {
    this.expSeleccionada = exp;
  }

  initExpUser() {
    this.expService.getExpOfUser().subscribe({
      next: (exp) => {
        this.experiencias = exp;
        this.imagenes = [];
        exp.forEach((ex) => {
          this.expService.getImageExp(ex.id).subscribe({
            next: (imagen) => {
              this.imagenes.push(imagen.message);
            },
          });
        });
      },
    });
  }
  initExpMain() {
    this.mainService.getExpMain().subscribe({
      next: (exp) => {
        this.experiencias = exp;
        this.imagenes = [];
        exp.forEach((ex) => {
          this.mainService.getExpImagenMain(ex.id).subscribe({
            next: (imagen) => {
                this.imagenes.push(imagen.message);
            },
          });
        });
      },
    });
  }

  postExp(form: Experiencia) {
    this.expService.postExp(form).subscribe({
      next: () => {
        this.toast.success('Se ha creado correctamente', 'Experiencia', {
          timeOut: 4000,
        });
        this.initExpUser();
      },
      error: () => {
        this.toast.error('No se pudo crear la experiencia', 'Experiencia', {
          timeOut: 4000,
        });
      },
    });
  }

  editExp(form: Experiencia) {
    if (this.expSeleccionada) {
      this.expService.editExp(form, this.expSeleccionada.id).subscribe({
        next: () => {
          this.toast.info('Se ha editado correctamente', 'Experiencia', {
            timeOut: 4000,
          });
          this.initExpUser();
          
        this.expSeleccionada = null;
        },
        error: () => {
          this.toast.error('No se pudo editar la experiencia', 'Experiencia', {
            timeOut: 4000,
          });
        },
      });
    }
  }

  editImageExp(imagen: File) {
    const form = new FormData();
    form.append('imagen', imagen);
    if(this.expSeleccionada){
      this.expService.editImageExp(form, this.expSeleccionada.id).subscribe({
        next: () => {
          this.toast.info('Se actualizó la imagen', 'Experiencia', {
            timeOut: 4000,
          });
          this.initExpUser();
          this.expSeleccionada = null;
        },
        error: () => {
          this.toast.error('No se pudo cargar su imagen', 'Experiencia', {
            timeOut: 5000,
          });
        },
      });
    }
   
  }
  deleteExp() {
    if (this.expSeleccionada) {
      this.expService.deleteExp(this.expSeleccionada.id).subscribe({
        next: () => {
          this.toast.success('Se eliminó correctamente', 'Experiencia', {
            timeOut: 4000,
          });
          this.initExpUser();
        this.expSeleccionada = null;
        },
        error: (error) => {
          this.toast.error('No se pudo eliminar', 'Experiencia', {
            timeOut: 4000,
          });
        },
      });
    }
  }
}
