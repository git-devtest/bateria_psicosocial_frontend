import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-usuarios-listado-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-listado.page.html',
  styleUrls: ['./usuarios-listado.page.css']
})

export class UsuariosListadoPage {
  usuarios: any[] = [];
  roles: any[] = [];
  empresas: any[] = []; 

  usuarioSeleccionado: any = {
    nombre: '',
    email: '',
    contrasena: '',
    rol_id: '',
    empresa_id: ''
  };

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

  ngOnInit() {
    this.obtenerUsuarios();
    this.cargarRolesYEmpresas();
  }
  
  cargarRolesYEmpresas() {
    this.http.get<any[]>(`${environment.apiUrl}/roles`).subscribe({
      next: data => this.roles = data,
      error: err => console.error('Error al cargar roles', err)
    });
  
    this.http.get<any[]>(`${environment.apiUrl}/empresas`).subscribe({
      next: data => this.empresas = data,
      error: err => console.error('Error al cargar empresas', err)
    });
  }

  guardarUsuario() {
    if (this.usuarioSeleccionado?.id) {
      // Actualizar
      this.http.put(`${environment.apiUrl}/usuarios/${this.usuarioSeleccionado.id}`, this.usuarioSeleccionado).subscribe({
        next: () => {
          console.log('✅ Usuario actualizado');
          this.obtenerUsuarios();
          this.cancelarEdicion();
        },
        error: err => console.error('❌ Error actualizando usuario:', err)
      });
    } else {
      // Crear
      this.http.post(`${environment.apiUrl}/usuarios`, this.usuarioSeleccionado).subscribe({
        next: () => {
          console.log('✅ Usuario creado');
          this.obtenerUsuarios();
          this.cancelarEdicion();
        },
        error: err => console.error('❌ Error creando usuario:', err)
      });
    }
  }

  obtenerUsuarios() {
    this.http.get<any[]>(`${environment.apiUrl}/usuarios`).subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  eliminarUsuario(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;
  
    this.http.delete(`${environment.apiUrl}/usuarios/${id}`).subscribe({
      next: () => {
        this.empresas = this.empresas.filter(e => e.id !== id);
        console.log(`✅ Usuario con ID ${id} eliminado`);
      },
      error: err => console.error('❌ Error al eliminar usuario:', err),
    });
  }

  editarUsuario(usuario: any) {
    this.usuarioSeleccionado = { ...usuario }; // Carga los datos en el formulario
  }
  
  cancelarEdicion() {
    this.usuarioSeleccionado = {
      nombre: '',
      email: '',
      contrasena: '',
      rol_id: '',
      empresa_id: ''
    };
  }
  
  
}
