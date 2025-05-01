import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideLucideIcons } from 'lucide-angular';
import { Home, Users, Building, KeyRound } from 'lucide-angular/icons';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideLucideIcons({ Home, Users, Building, KeyRound }) // Importamos solo los íconos que usamos
  ]
};
