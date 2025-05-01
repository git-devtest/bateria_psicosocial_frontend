import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cambiar-contrasena.page.html'
})
export class CambiarContrasenaComponent {
  actual = '';
  nueva = '';
  confirmar = '';
  mensaje = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  cambiarContrasena() {
    this.mensaje = '';
    this.error = '';

    if (this.nueva !== this.confirmar) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    this.http.post(`${environment.apiUrl}/usuarios/cambiar-contrasena`, {
      actual: this.actual,
      nueva: this.nueva
    }).subscribe({
      next: () => {
        this.mensaje = 'Contraseña actualizada correctamente';
        this.actual = '';
        this.nueva = '';
        this.confirmar = '';
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al cambiar contraseña';
      }
    });
  }
}
