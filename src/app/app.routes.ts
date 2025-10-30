import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { authGuard } from './guards/auth-guard';
import { ReceitaDetalheComponent } from './pages/receita-detalhe/receita-detalhe';
// import { PerfilComponent } from './pages/perfil/perfil.component'; // Exemplo futuro
// import { SearchResultsComponent } from './pages/search-results/search-results.component'; // Exemplo futuro

export const routes: Routes = [

{ path: 'login', component: Login },
{ path: 'cadastro', component: Cadastro },
{ path: 'home', component: Home, canActivate: [authGuard]},
{ path: 'receita/:id',component: ReceitaDetalheComponent, canActivate: [authGuard] },

//{path: 'perfil',
// component: PerfilComponent, // Adicionar componente quando criado
    //redirectTo: '/home', // Redireciona para home por enquanto
   // canActivate: [authGuard]
  //},
  //{
    //path: 'search',
    // component: SearchResultsComponent, // Adicionar componente quando criado
   // redirectTo: '/home', // Redireciona para home por enquanto
    // Não precisa de guardião se os resultados forem públicos
//},
    
{ path: '', redirectTo: '/home', pathMatch: 'full' }

];
