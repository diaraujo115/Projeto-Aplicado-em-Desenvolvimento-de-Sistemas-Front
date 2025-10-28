import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

{ path: 'login', component: Login },
{ path: 'cadastro', component: Cadastro },

{ 
    path: 'home', 
    component: Home, 
    canActivate: [authGuard] // O guardião protegerá esta rota
  },
    
    { path: '', redirectTo: '/home', pathMatch: 'full' }

];
