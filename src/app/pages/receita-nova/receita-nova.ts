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

  public categoriasDisponiveis: string[] = [
    "Sobremesa",
    "Prato Principal",
    "Lanche",
    "Aperitivo",
    "Bebida",
    "Salada",
    "Sopa"
  ];

  public dietasDisponiveis: string[] = [
    "Nenhuma",
    "Vegetariana",
    "Vegana",
    "Sem Glúten",
    "Sem Lactose",
    "Low Carb"
  ];

  receita = {
    titulo: '',
    descricao: '',
    modoPreparo: '',
    categoria: '',
    dieta: ''
  };

  ingredientesDaReceita: IngredienteFormLinha[] = [];

  listaDeTodosIngredientes: Ingrediente[] = [];

  public passosDePreparo: string[] = [];

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

    this.adicionarPasso();

    this.receita.categoria = this.categoriasDisponiveis[0];
    this.receita.dieta = this.dietasDisponiveis[0];

    
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

    const modoPreparoString = this.passosDePreparo
        .map((passo, index) => `${index + 1}. ${passo}`) 
        .join('\n'); 

    const dadosFinais = {
      ...this.receita,
      modoPreparo: modoPreparoString,
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

  adicionarPasso(): void {
    this.passosDePreparo.push('');
  }

  removerPasso(index: number): void {
    if (this.passosDePreparo.length > 1) {
      this.passosDePreparo.splice(index, 1);
    } else {
      this.notificationService.show('A receita deve ter pelo menos um passo.', 'error');
    }
  }

  // Permite que o *ngFor funcione corretamente ao editar os campos
  trackByIndex(index: number, obj: any): any {
    return index;
  }
}