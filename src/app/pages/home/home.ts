
import { Auth } from '../../services/auth'; 
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReceitaService, FiltrosReceita } from '../../services/receita'; 
import { Receita } from '../../interfaces/receita';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit{

  public receitas: Receita[] = [];
  filtroCategoria: string = '';
  filtroDieta: string = '';

  // (Opcional) Listas para preencher os dropdowns
  categoriasDisponiveis: string[] = ['Bolos', 'Sobremesa', 'Prato Principal', 'Lanche']; 
  dietasDisponiveis: string[] = ['Vegetariana', 'Sem Glúten', 'Low Carb']; 

  constructor(
    private authService: Auth,private receitaService: ReceitaService ) {}


    ngOnInit(): void {
    this.aplicarFiltros();
  }

  carregarReceitas(filtros?: FiltrosReceita): void {
    this.receitaService.getReceitas(filtros).subscribe({
      next: (response) => {
        this.receitas = response;
        console.log('Receitas carregadas:', this.receitas);
      },
      error: (err) => { /* ... (tratamento de erro existente) ... */ }
    });
  }
  
  onLogout(): void {
    this.authService.logout();
  }

  aplicarFiltros(): void {
    const filtros: FiltrosReceita = {};
    if (this.filtroCategoria) {
      filtros.categoria = this.filtroCategoria;
    }
    if (this.filtroDieta) {
      filtros.dieta = this.filtroDieta;
    }
    this.carregarReceitas(filtros);
  }

  // === NOVO MÉTODO ===
  // Limpa os filtros e recarrega todas as receitas
  limparFiltros(): void {
    this.filtroCategoria = '';
    this.filtroDieta = '';
    this.aplicarFiltros();
  }
}