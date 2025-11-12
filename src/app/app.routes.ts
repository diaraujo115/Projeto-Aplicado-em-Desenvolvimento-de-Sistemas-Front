import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { authGuard } from './guards/auth-guard';
import { ReceitaDetalheComponent } from './pages/receita-detalhe/receita-detalhe';
import { Perfil } from './pages/perfil/perfil';
import { PerfilEditar } from './pages/perfil-editar/perfil-editar';
import { SearchResults } from './pages/search-results/search-results';
import { ReceitaNova } from './pages/receita-nova/receita-nova';
import { RecomendarPorIngredientes } from './pages/recomendar-por-ingredientes/recomendar-por-ingredientes';

export const routes: Routes = [

{ path: 'login', component: Login },
{ path: 'cadastro', component: Cadastro },
{ path: 'home', component: Home, canActivate: [authGuard]},
{ path: 'receita/:id',component: ReceitaDetalheComponent, canActivate: [authGuard] },

{ 
    path: 'perfil', 
    component: Perfil,
    canActivate: [authGuard]
  },
  { 
    path: 'perfil/editar', 
    component: PerfilEditar, 
    canActivate: [authGuard]
  },
  { 
    path: 'search',
    component: SearchResults
  },
  { 
    path: 'receitas/nova', 
    component: ReceitaNova, 
    canActivate: [authGuard] 
  },
  {
    path: 'recomendar',
    component: RecomendarPorIngredientes,
    canActivate: [authGuard]
  },
    
{ path: '', redirectTo: '/home', pathMatch: 'full' }

];
