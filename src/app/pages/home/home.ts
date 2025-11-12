
import { Auth } from '../../services/auth'; 
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReceitaService, FiltrosReceita } from '../../services/receita'; 
import { Receita } from '../../interfaces/receita';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';

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

  categoriasDisponiveis: string[] = ["Sobremesa",
    "Prato Principal",
    "Lanche",
    "Aperitivo",
    "Bebida",
    "Salada",
    "Sopa"]; 
  dietasDisponiveis: string[] = [
    "Vegetariana",
    "Vegana",
    "Sem Glúten",
    "Sem Lactose",
    "Low Carb"]; 

  constructor(
    private authService: Auth,private receitaService: ReceitaService , private notificationService: NotificationService) {}


    ngOnInit(): void {
    this.aplicarFiltros();
  }

  carregarReceitas(filtros?: FiltrosReceita): void {
    this.receitaService.getReceitas(filtros).subscribe({
      next: (response) => {
        this.receitas = response;
        console.log('Receitas carregadas:', this.receitas);
      },
      error: (err) => { 
        this.notificationService.show('Não foi possível retornar as receitas!', 'error'); }
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

  
  limparFiltros(): void {
    this.filtroCategoria = '';
    this.filtroDieta = '';
    this.aplicarFiltros();
  }
}