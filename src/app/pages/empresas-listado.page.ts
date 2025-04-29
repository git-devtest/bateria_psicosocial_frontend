import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-empresas-listado',
  imports: [CommonModule, FormsModule],
  templateUrl: './empresas-listado.page.html',
  styleUrl: './empresas-listado.page.css'
})
export class EmpresasListadoPage {
  empresas: any[] = [];

  empresaSeleccionada: any = {
    nombre: '',
    nit: '',
    email: '',
    telefono: '',
    direccion: ''
  };

  constructor(private http: HttpClient) {
    console.log('EmpresasListadoPage cargado correctamente');
    this.http.get<any[]>(`${environment.apiUrl}/empresas`).subscribe({
      next: data => {
        this.empresas = data;
        console.log(this.empresas);
      },
      error: err => console.error('Error al cargar empresas:', err),
    });
  }

  ngOnInit() {
    this.obtenerEmpresas();
  }

  eliminarEmpresa(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta empresa?')) return;
  
    this.http.delete(`${environment.apiUrl}/empresas/${id}`).subscribe({
      next: () => {
        this.empresas = this.empresas.filter(e => e.id !== id);
        console.log(`✅ Empresa con ID ${id} eliminada`);
      },
      error: err => console.error('❌ Error al eliminar empresa:', err),
    });
  }
  
  editarEmpresa(empresa: any) {
    this.empresaSeleccionada = { ...empresa }; // Carga los datos en el formulario
  }

  obtenerEmpresas() {
    this.http.get<any[]>(`${environment.apiUrl}/empresas`).subscribe({
      next: (data) => {
        this.empresas = data;
      },
      error: (err) => {
        console.error('Error al cargar empresas:', err);
      }
    });
  }
  
  guardarEmpresa() {
    if (this.empresaSeleccionada?.id) {
      // Actualizar empresa
      this.http.put(`${environment.apiUrl}/empresas/${this.empresaSeleccionada.id}`, this.empresaSeleccionada).subscribe({
        next: () => {
          console.log('✅ Empresa actualizada');
          this.obtenerEmpresas();
          this.cancelarEdicion();
        },
        error: (err) => {
          console.error('❌ Error al actualizar empresa:', err);
        }
      });
    } else {
      // Crear empresa
      this.http.post(`${environment.apiUrl}/empresas`, this.empresaSeleccionada).subscribe({
        next: () => {
          console.log('✅ Empresa creada');
          this.obtenerEmpresas();
          this.cancelarEdicion();
        },
        error: (err) => {
          console.error('❌ Error al crear empresa:', err);
        }
      });
    }
  }
  
  cancelarEdicion() {
    this.empresaSeleccionada = {
      nombre: '',
      nit: '',
      email: '',
      telefono: '',
      direccion: ''
    };
  }

}
