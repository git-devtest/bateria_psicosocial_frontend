import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    let reqClonado = req;

    if (token) {
      reqClonado = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(reqClonado).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.warn('⚠️ Token expirado o inválido. Cerrando sesión...');
          localStorage.clear();
          location.href = '/login'; // Redirecciona a login
        }
        return throwError(() => error);
      })
    );
  }
}
