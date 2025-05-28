import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private apiUrl = `${environment.apiUrl}/catalogos`;

  constructor(private http: HttpClient) {}

  obtenerTiposCargo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipos-cargo`);
  }

  obtenerTiposContrato(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipos-contrato`);
  }

  obtenerTiposSalario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipos-salario`);
  }
}