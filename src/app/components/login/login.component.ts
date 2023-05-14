import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private readonly authService:AuthenticationService, private readonly toastr:ToastrService, private readonly router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response)=>{

        this.authService.setUserId(response.idUsuario!.toString());
        this.authService.initJwtExpiration();
        this.router.navigate(['/home'])
        this.toastr.success('Usuario autenticado', 'Login', {timeOut:4000});
      },
      error: (error)=>{
        this.toastr.error(error.error.message, 'Login', {timeOut: 4000});
      }
    })
  }
}
