import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})

export class LoginPage {
  loginForm: FormGroup;
  errorMsg: string | null = null;

  constructor(
    private fb: FormBuilder,  
    private authApi: AuthApiService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authApi.login(this.loginForm.value).subscribe({
      next: ({ token }) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMsg = err.error?.error || 'Error al iniciar sesión';
      }
    });
  }
}
