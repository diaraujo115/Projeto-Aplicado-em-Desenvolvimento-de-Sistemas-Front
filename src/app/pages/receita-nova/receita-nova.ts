// src/app/pages/receita-nova/receita-nova.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterLink } from '@angular/router'; 
import { Ingrediente, IngredienteService } from '../../services/ingrediente';
import { ReceitaService } from '../../services/receita';
import { NotificationService } from '../../services/notification';


// Interface para a linha do ingrediente no formulário
interface IngredienteFormLinha {
  ingredienteId: number | null;
  quantidade: string;
  unidade: string;
}

@Component({
  selector: 'app-receita-nova',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Adicionar FormsModule e RouterLink
  templateUrl: './receita-nova.html',
  styleUrls: ['./receita-nova.css']
})
export class ReceitaNova implements OnInit {

  // Objeto principal do formulário
  receita = {
    titulo: '',
    descricao: '',
    modoPreparo: '',
    categoria: '',
    dieta: ''
  };

  // Array dinâmico para os ingredientes
  ingredientesDaReceita: IngredienteFormLinha[] = [];

  // Lista de todos os ingredientes do banco (para os dropdowns)
  listaDeTodosIngredientes: Ingrediente[] = [];

  constructor(
    private ingredienteService: IngredienteService,
    private receitaService: ReceitaService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Carrega a lista de ingredientes do banco
    this.ingredienteService.getIngredientes().subscribe({
      next: (data) => {
        this.listaDeTodosIngredientes = data;
      },
      error: (err) => console.error('Erro ao buscar ingredientes', err)
    });

    // Inicia com uma linha de ingrediente
    this.adicionarLinhaIngrediente();
  }

  // Adiciona uma nova linha em branco ao formulário de ingredientes
  adicionarLinhaIngrediente(): void {
    this.ingredientesDaReceita.push({
      ingredienteId: null,
      quantidade: '',
      unidade: ''
    });
  }

  // Remove uma linha pelo seu índice
  removerLinhaIngrediente(index: number): void {
    if (this.ingredientesDaReceita.length > 1) {
      this.ingredientesDaReceita.splice(index, 1);
    } else {
      this.notificationService.show('A receita deve ter pelo menos um ingrediente.', 'error');
    }
  }

  // Envia o formulário completo para o back-end
  onSubmit(): void {
    // 1. Formata os dados dos ingredientes para o formato que o back-end espera
    const ingredientesFormatados = this.ingredientesDaReceita.map(linha => ({
      ingrediente: { id: linha.ingredienteId },
      quantidade: linha.quantidade,
      unidade: linha.unidade
    }));

    // 2. Cria o objeto final da receita
    const dadosFinais = {
      ...this.receita,
      ingredientes: ingredientesFormatados
    };

    // 3. Envia para o serviço
    this.receitaService.criarReceita(dadosFinais).subscribe({
      next: (receitaCriada) => {
        this.notificationService.show('Receita criada com sucesso!', 'success');
        // 4. Redireciona para a página de detalhes da nova receita
        this.router.navigate(['/receita', receitaCriada.id]);
      },
      error: (err) => {
        console.error('Erro ao criar receita', err);
        this.notificationService.show('Falha ao criar receita. Verifique os campos.', 'error');
      }
    });
  }
}