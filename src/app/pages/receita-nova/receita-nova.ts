
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
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

  receita = {
    titulo: '',
    descricao: '',
    modoPreparo: '',
    categoria: ''
  };

  public unidadesDisponiveis: string[] = [
    "gramas",
    "kg",
    "xícara",
    "xícaras",
    "colher de sopa",
    "colher de chá",
    "litro",
    "mililitro",
    "ml",
    "unidade",
    "unidades",
    "inteiro",
    "fatia",
    "pedaço",
    "lata",
    "pitada",
    "copo"
  ];

  ingredientesDaReceita: IngredienteFormLinha[] = [];

  listaDeTodosIngredientes: Ingrediente[] = [];

  public passosDePreparo: string[] = [];

  isEditMode: boolean = false; 
  receitaIdParaEditar: number | null = null;
  tituloDaPagina: string = 'Criar Nova Receita';

  constructor(
    private ingredienteService: IngredienteService,
    private receitaService: ReceitaService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 3. VERIFICAR SE ESTÁ EM MODO DE EDIÇÃO
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        // MODO DE EDIÇÃO
        this.isEditMode = true;
        this.receitaIdParaEditar = +id;
        this.tituloDaPagina = 'Editar Receita';
        this.carregarDadosDaReceita(+id);
      } else {
        // MODO DE CRIAÇÃO
        this.isEditMode = false;
        this.tituloDaPagina = 'Criar Nova Receita';
        this.carregarIngredientesDoBanco();
        this.adicionarLinhaIngrediente();
        this.adicionarPasso();
      }
    });
  }

  adicionarLinhaIngrediente(): void {
    this.ingredientesDaReceita.push({
      ingredienteId: null,
      quantidade: '',
      unidade: 'gramas'
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
  
  const modoPreparoString = this.passosDePreparo
      .map((passo, index) => `${index + 1}. ${passo}`)
      .join('\n');

  
  if (this.isEditMode && this.receitaIdParaEditar) {

   
    const ingredientesUpdate = this.ingredientesDaReceita.map(linha => ({
      ingredienteId: linha.ingredienteId, 
      quantidade: linha.quantidade,
      unidade: linha.unidade
    }));

    
    const dadosUpdate = {
      titulo: this.receita.titulo,
      descricao: this.receita.descricao,
      categoria: this.receita.categoria,
      modoPreparo: modoPreparoString,
      ingredientes: ingredientesUpdate 
    };

    this.receitaService.updateReceita(this.receitaIdParaEditar, dadosUpdate).subscribe({
      next: (receitaAtualizada) => {
        this.notificationService.show('Receita atualizada com sucesso!', 'success');
        this.router.navigate(['/receita', this.receitaIdParaEditar]);
      },
      error: (err) => {
        console.error('Erro ao atualizar receita', err);
        this.notificationService.show('Falha ao atualizar receita.', 'error');
      }
    });

  } else {

    
    const ingredientesCreate = this.ingredientesDaReceita.map(linha => ({
      ingrediente: { id: linha.ingredienteId },
      quantidade: linha.quantidade,
      unidade: linha.unidade
    }));

   
    const dadosCreate = {
      ...this.receita,
      modoPreparo: modoPreparoString,
      ingredientes: ingredientesCreate 
    };

    this.receitaService.criarReceita(dadosCreate).subscribe({
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

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  carregarDadosDaReceita(id: number): void {
    this.ingredienteService.getIngredientes().subscribe(listaIngredientes => {
      this.listaDeTodosIngredientes = listaIngredientes;

      this.receitaService.getReceitaPorId(id).subscribe(receitaDetalhe => {
        this.receita = {
          titulo: receitaDetalhe.titulo,
          descricao: receitaDetalhe.descricao,
          modoPreparo: '', 
          categoria: receitaDetalhe.categoria
          
        };

        if (receitaDetalhe.modoPreparo) {
          this.passosDePreparo = receitaDetalhe.modoPreparo
            .split('\n')
            .map(passo => passo.substring(passo.indexOf(' ') + 1));
        } else {
          this.adicionarPasso();
        }

        this.ingredientesDaReceita = receitaDetalhe.ingredientes.map(ing => ({
          ingredienteId: ing.ingredienteId, 
          quantidade: ing.quantidade,
          unidade: ing.unidade
        }));

        if (this.ingredientesDaReceita.length === 0) {
          this.adicionarLinhaIngrediente();
        }
      });
    });
  }

  carregarIngredientesDoBanco(): void {
    this.ingredienteService.getIngredientes().subscribe({
      next: (data) => { this.listaDeTodosIngredientes = data; },
      error: (err) => console.error('Erro ao buscar ingredientes', err)
    });
  }
}