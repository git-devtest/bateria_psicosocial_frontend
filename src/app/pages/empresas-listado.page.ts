import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-empresas-listado',
  imports: [CommonModule],
  templateUrl: './empresas-listado.page.html',
  styleUrl: './empresas-listado.page.css'
})
export class EmpresasListadoPage {
  empresas: any[] = [];

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
  

}
