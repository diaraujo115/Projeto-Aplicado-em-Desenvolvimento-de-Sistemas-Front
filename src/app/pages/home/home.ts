
import { Auth } from '../../services/auth'; 
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReceitaService } from '../../services/receita'; 
import { Receita } from '../../interfaces/receita';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit{

  public receitas: Receita[] = [];

  constructor(
    private authService: Auth,private receitaService: ReceitaService ) {}


    ngOnInit(): void {
    this.carregarReceitas();
  }

  carregarReceitas(): void {
    this.receitaService.getReceitas().subscribe({
      next: (response) => {
        this.receitas = response;
        console.log('Receitas carregadas:', this.receitas);
      },
      error: (err) => {
        console.error('Erro ao carregar receitas', err);
        // Se o token for inválido/expirado, o interceptor (ou o erro 401)
        // pode ser tratado aqui, talvez forçando um logout.
        if (err.status === 401 || err.status === 403) {
          alert('Sua sessão expirou. Por favor, faça login novamente.');
          this.authService.logout();
        }
      }
    });
  }
  
  onLogout(): void {
    this.authService.logout();
  }
}