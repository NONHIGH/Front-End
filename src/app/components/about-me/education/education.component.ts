import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Educacion } from 'src/app/models/educacion.model';
import { ResponseOk } from 'src/app/models/response-ok';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { EditService } from 'src/app/services/edit/edit.service';
import { EducacionService } from 'src/app/services/educacion/educacion.service';
import { MainService } from 'src/app/services/notAuth/main.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  educaciones: Educacion[] = [];
  imagenes : string[]= [];
  formEdu! :FormGroup;
  eduSeleccionada : Educacion | null = null;

  imagefiles?: File;

  constructor(
    private readonly educacionService: EducacionService,
    private readonly mainService: MainService,
    private readonly toast: ToastrService,
    private readonly authService:AuthenticationService,
    readonly editService:EditService,
    private readonly fB:FormBuilder
  ) {}
  

  ngOnInit(): void {
    this.initForm()
    
    if(this.authService.isLogged()){
      this.initEducacionesUser();
      this.initForm();
    }
    else{
      this.initEducacionesMain();
    }
  }
  initForm(){
    return this.fB.group({
      nombreInstitucion : ['', Validators.required],
      titulo : ['', Validators.required],
      fechaInicio : ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      fechaFinalizacion : ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]]
    })
  }
  seleccionarEdu(edu:Educacion){
    this.eduSeleccionada = edu;
    
  }

  initEducacionesUser() {
    this.educacionService.getEducacionOfUser().subscribe({
      next: (edu)=>{
        this.educaciones = edu;
        this.imagenes = [];
        edu.forEach((ed)=>{
          
          this.educacionService.getImageEdu(ed.id).subscribe({
            next: (imagen:ResponseOk)=>{
              this.imagenes.push(imagen.message);
            }
          })
        })
      }
    })
  }
  initEducacionesMain() {
    this.mainService.getEduMain().subscribe({
      next: (edu)=>{
        this.educaciones = edu;
        this.imagenes = [];
        edu.forEach(ed=>{
          this.mainService.getEduImagenMain(ed.id).subscribe({
            next: (imagen)=>{
              this.imagenes.push(imagen.message);
            }
          })
        })
      }
    })
  }
  
  postEdu(form:Educacion){
    this.educacionService.postEdu(form).subscribe({
      next: (response)=>{
        this.toast.success('Se ha creado correctamente','Educación',{timeOut:4000});
        this.initEducacionesUser();
      },
      error:()=>{
        this.toast.error('No se pudo crear la educación', 'Educación', {timeOut:4000});
      }
    })
  }

  editEdu(form:Educacion){
    if(this.eduSeleccionada){
      this.educacionService.editEdu(form, this.eduSeleccionada.id).subscribe({
        next: ()=>{
          this.toast.info('Se ha editado correctamente','Educación',{timeOut:4000});
          this.initEducacionesUser();
          this.eduSeleccionada = null;
        },
        error:()=>{
          this.toast.error('No se pudo editar la educación', 'Educación', {timeOut:4000});
        }
      })
    }
  }

  editImageEdu(imagen:File){
    const form = new FormData();
    form.append('imagen', imagen);
    if(this.eduSeleccionada){
      this.educacionService.editImageEdu(form,  this.eduSeleccionada.id).subscribe({
      
        next: () =>{
          this.toast.info('Se actualizó la imagen', 'Educación', {timeOut:4000});
          this.initEducacionesUser();
          this.eduSeleccionada = null;
        },
        error: () =>{
          this.toast.error('No se pudo cargar su imagen', 'Educación',{timeOut:5000});
        }
      })
    }
    
  }
  deleteEdu(){
    if(this.eduSeleccionada){
      this.educacionService.deleteEdu(this.eduSeleccionada.id).subscribe({
        next: ()=>{
          this.toast.success('Se eliminó correctamente', 'Educación', {timeOut:4000});
          this.initEducacionesUser();
          this.eduSeleccionada = null;
        },
        error: ()=>{
          this.toast.error('No se pudo eliminar', 'Educación', {timeOut:4000});
        }
      });
    }
    
  }


}
