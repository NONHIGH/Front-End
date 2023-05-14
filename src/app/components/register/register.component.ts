import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ResponseOk } from 'src/app/models/response-ok';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthenticationService,
    private readonly toastService: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  onSubmit() {
    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.toastService.success(
          'Se ha registrado correctamente',
          'Registro',
          { timeOut: 10000 }
        );
      },
      error: (error) => {
        this.toastService.error(error.error.message, 'Registro', { timeOut: 5000 });
      },
    });
  }
}
