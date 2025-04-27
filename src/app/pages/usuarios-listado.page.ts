import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-usuarios-listado-page',
  imports: [CommonModule],
  templateUrl: './usuarios-listado.page.html',
  styleUrls: ['./usuarios-listado.page.css']
})

export class UsuariosListadoPage {
  usuarios: any[] = [];

  constructor(private http: HttpClient) {
    console.log('UsuariosListadoPage cargado correctamente');
    this.http.get<any[]>(`${environment.apiUrl}/usuarios`).subscribe({
      next: data => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      error: err => console.error('Error al cargar usuarios:', err),
    });
  }
}
