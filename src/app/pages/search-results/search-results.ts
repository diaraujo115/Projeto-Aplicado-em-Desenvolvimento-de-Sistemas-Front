import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Receita } from '../../interfaces/receita';
import { ReceitaService } from '../../services/receita';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterLink], // Adicionar imports
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.css']
})
export class SearchResults implements OnInit {

  resultados: Receita[] = [];
  termoBusca: string = '';
  estaCarregando: boolean = true;

  constructor(
    private route: ActivatedRoute, // Para ler a URL
    private receitaService: ReceitaService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Ouve mudanças nos parâmetros da URL (importante se o usuário buscar de novo)
    this.route.queryParamMap.subscribe(params => {
      this.termoBusca = params.get('q') || ''; // Pega o valor do parâmetro 'q'
      this.estaCarregando = true;

      if (this.termoBusca) {
        this.receitaService.searchReceitas(this.termoBusca).subscribe({
          next: (data) => {
            this.resultados = data;
            this.estaCarregando = false;
          },
          error: (err) => {
            console.error('Erro ao buscar receitas', err);
            this.notificationService.show('Erro ao buscar receitas', 'error')

            this.estaCarregando = false;
          }
        });
      } else {
        // Se nenhum termo foi fornecido, não mostra nada
        this.resultados = [];
        this.estaCarregando = false;
      }
    });
  }
}
