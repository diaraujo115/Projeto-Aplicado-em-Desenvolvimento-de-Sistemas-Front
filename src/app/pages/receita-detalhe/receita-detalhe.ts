
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Importar ActivatedRoute
import { CommonModule } from '@angular/common';
import { ReceitaService } from '../../services/receita';
import { ReceitaDetalhe } from '../../interfaces/receita';

@Component({
  selector: 'app-receita-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './receita-detalhe.html',
  styleUrls: ['./receita-detalhe.css']
})
export class ReceitaDetalheComponent implements OnInit {

  receita: ReceitaDetalhe | null = null;

  constructor(
    private route: ActivatedRoute, // Para ler a URL
    private receitaService: ReceitaService
  ) {}

  ngOnInit(): void {
    // 1. Pega o 'id' da URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // 2. Chama o serviço para buscar a receita
      this.receitaService.getReceitaPorId(+id).subscribe({ // O + converte string para número
        next: (response) => {
          this.receita = response;
          console.log('Receita carregada:', this.receita);
        },
        error: (err) => {
          console.error('Erro ao carregar detalhes da receita', err);
          // Lógica de erro (ex: receita não encontrada)
        }
      });
    }
  }
}