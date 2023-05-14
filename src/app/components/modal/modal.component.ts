import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() id: string = '';
  @Output() save = new EventEmitter<string>();

  public form = new FormGroup({
    value: new FormControl('', Validators.required),
  });

  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.get('value')!.value!);
    } else {
    }
  }
}
