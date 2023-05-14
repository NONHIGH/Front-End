import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent {
  @Input() id?: string;
  @Input() title?: string;
  @Input() formLabel1?: string;
  @Input() formLabel2?: string;
  @Input() formControl1!: string;
  @Input() formControl2!: string;
  @Input() startDate!: string;
  @Input() endDate!: string;

  @Output() save = new EventEmitter<any>();
  @Output() imagen = new EventEmitter<File>();
  @Output() delete = new EventEmitter<void>();

  formGroup!: FormGroup;
  imagenSeleccionada?: File;

  constructor(private readonly elementRef:ElementRef) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      [this.formControl1]: new FormControl('',Validators.required),
      [this.formControl2]: new FormControl('',Validators.required),
      [this.startDate]: new FormControl('',Validators.required),
      [this.endDate]: new FormControl('',Validators.required),
    });
  }
  onSubmit(){
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
      this.save.emit(formValue);
      this.formGroup.reset();
    }
  }

  onDelete(){
    if(confirm("¿Estas seguro?")){
      this.delete.emit();
    }
  }

  backToFirst() {
    const buttonElement = this.elementRef.nativeElement.querySelector('#back-to-first-button');
    buttonElement.setAttribute('data-bs-target', '#' + this.id);
  }
  onImageSelected(event: any): void {
    this.imagenSeleccionada = event.target.files[0];
  }

  emitirImagen(){
    this.imagen.emit(this.imagenSeleccionada);
  }
  


  
}

