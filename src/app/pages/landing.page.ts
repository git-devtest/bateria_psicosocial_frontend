import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-landing-page',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css']
})

export class LandingPage {
  usuario : string = 'Usuario'; // luego lo obtendrás desde el token

  constructor(private router: Router, private authService: AuthService) {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    const rol = this.authService.getUserRole();
    this.usuario = rol ?? 'Usuario';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
