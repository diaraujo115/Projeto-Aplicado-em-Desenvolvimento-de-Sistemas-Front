import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { authGuard } from './guards/auth-guard';
import { ReceitaDetalheComponent } from './pages/receita-detalhe/receita-detalhe';

export const routes: Routes = [

{ path: 'login', component: Login },
{ path: 'cadastro', component: Cadastro },
{ path: 'home', component: Home, canActivate: [authGuard]},
{ path: 'receita/:id',component: ReceitaDetalheComponent, canActivate: [authGuard] },
    
{ path: '', redirectTo: '/home', pathMatch: 'full' }

];
