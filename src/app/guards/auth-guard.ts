
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Usuário logado, permite o acesso
  } else {
    // Usuário não logado, redireciona para a tela de login
    router.navigate(['/login']);
    return false;
  }
};