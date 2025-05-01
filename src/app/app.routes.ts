import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { LandingPage } from './pages/landing.page';
import { authGuard } from './guards/auth.guard';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena.page';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginPage },
  {
    path: 'dashboard',
    component: LandingPage,
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/home.page').then(m => m.HomePage) },
      { path: 'usuarios', loadComponent: () => import('./pages/usuarios-listado.page').then(m => m.UsuariosListadoPage) },
      { path: 'empresas', loadComponent: () => import('./pages/empresas-listado.page').then(m => m.EmpresasListadoPage) },
      { path: 'perfil/cambiar-contrasena', component: CambiarContrasenaComponent }
    ]
  }
];
