import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  editMode$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  enableEditMode() {
    this.editMode$.next(true);
  }

  disableEditMode() {
    this.editMode$.next(false);
  }
}
