import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CatalogoService } from '../services/catalogo.service';

@Component({
  selector: 'app-bateria-datos-generales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bateria-datos-generales.page.html',
  styleUrls: ['./bateria-datos-generales.page.css'],
})

export class BateriaDatosGeneralesPage implements OnInit {
  
  tiposCargo : any[] = [];
  tiposContrato : any[] = [];
  tiposSalario : any[] = [];
  
  datos = {
    ciudad_trabajo: '',
    depto_trabajo: '',
    anios_empresa_menos_1: 0,
    anios_empresa_mas_1: 0,
    cargo_actual: '',
    tipo_cargo_id: 0,
    nombre_area_seccion: '',
    tipo_contrato_id: 0,
    horas_diarias: 0,
    tipo_salario_id: 0
  };

  mensaje = '';
  error = '';

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private catalogoService: CatalogoService
  ) {}

  ngOnInit(): void {
    this.catalogoService.obtenerTiposCargo().subscribe({
      next: (res) => this.tiposCargo = res,
      error: (err) => console.error('Error al cargar tipos de cargo:', err)
    });

    this.catalogoService.obtenerTiposContrato().subscribe({
      next: (res) => this.tiposContrato = res,
      error: (err) => console.error('Error al cargar tipos de contrato:', err)
    });

    this.catalogoService.obtenerTiposSalario().subscribe({
      next: (res) => this.tiposSalario = res,
      error: (res) => console.error('Error al cargar tipos de salario:', res)
    });
  }

  guardarDatos(){
    this.mensaje = '';
    this.error = '';

    this.http.post(`${environment.apiUrl}/form-datos-generales`, this.datos).subscribe({
        next: () => {
          this.mensaje = 'Datos guardados correctamente.';
          this.router.navigate(['/dashboard/bateria/estres']);
        }, 
        error: (error) => {
          console.error('Error al guardar los datos:', error);
          this.error = error.error?.error || 'Error al guardar los datos. Intente nuevamente.';
        }
      });
  }
  
}
