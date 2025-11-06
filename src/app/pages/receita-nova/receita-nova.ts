// src/app/pages/receita-nova/receita-nova.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterLink } from '@angular/router'; 
import { Ingrediente, IngredienteService } from '../../services/ingrediente';
import { ReceitaService } from '../../services/receita';
import { NotificationService } from '../../services/notification';


interface IngredienteFormLinha {
  ingredienteId: number | null;
  quantidade: string;
  unidade: string;
}

@Component({
  selector: 'app-receita-nova',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './receita-nova.html',
  styleUrls: ['./receita-nova.css']
})
export class ReceitaNova implements OnInit {

  receita = {
    titulo: '',
    descricao: '',
    modoPreparo: '',
    categoria: '',
    dieta: ''
  };

  ingredientesDaReceita: IngredienteFormLinha[] = [];

  listaDeTodosIngredientes: Ingrediente[] = [];

  constructor(
    private ingredienteService: IngredienteService,
    private receitaService: ReceitaService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ingredienteService.getIngredientes().subscribe({
      next: (data) => {
        this.listaDeTodosIngredientes = data;
      },
      error: (err) => console.error('Erro ao buscar ingredientes', err)
    });

    this.adicionarLinhaIngrediente();
  }

  adicionarLinhaIngrediente(): void {
    this.ingredientesDaReceita.push({
      ingredienteId: null,
      quantidade: '',
      unidade: ''
    });
  }

  removerLinhaIngrediente(index: number): void {
    if (this.ingredientesDaReceita.length > 1) {
      this.ingredientesDaReceita.splice(index, 1);
    } else {
      this.notificationService.show('A receita deve ter pelo menos um ingrediente.', 'error');
    }
  }

  onSubmit(): void {
    const ingredientesFormatados = this.ingredientesDaReceita.map(linha => ({
      ingrediente: { id: linha.ingredienteId },
      quantidade: linha.quantidade,
      unidade: linha.unidade
    }));

    const dadosFinais = {
      ...this.receita,
      ingredientes: ingredientesFormatados
    };

    this.receitaService.criarReceita(dadosFinais).subscribe({
      next: (receitaCriada) => {
        this.notificationService.show('Receita criada com sucesso!', 'success');
        this.router.navigate(['/receita', receitaCriada.id]);
      },
      error: (err) => {
        console.error('Erro ao criar receita', err);
        this.notificationService.show('Falha ao criar receita. Verifique os campos.', 'error');
      }
    });
  }
}