import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router'; 
import { Receita } from '../../interfaces/receita';
import { Ingrediente, IngredienteService } from '../../services/ingrediente';
import { ReceitaService } from '../../services/receita';
import { NotificationService } from '../../services/notification';
import { RecomendacaoStateService } from '../../services/recomendacao-state';

@Component({
  selector: 'app-recomendar-por-ingredientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './recomendar-por-ingredientes.html',
  styleUrls: ['./recomendar-por-ingredientes.css']
})
export class RecomendarPorIngredientes implements OnInit {


  listaTodosIngredientes: Ingrediente[] = []; 

  listaFiltrada: Ingrediente[] = [];

  listaSelecionada: Ingrediente[] = []; 

  termoBusca: string = ''; 


  receitasRecomendadas: Receita[] = [];
  estaCarregando: boolean = true;
  buscou: boolean = false;

  constructor(
    private ingredienteService: IngredienteService,
    private receitaService: ReceitaService,
    private notificationService: NotificationService,
    public stateService: RecomendacaoStateService
  ) {}

  ngOnInit(): void {
    this.estaCarregando = true;
    this.ingredienteService.getIngredientes().subscribe({
      next: (data) => {
        this.listaTodosIngredientes = data; 
        this.estaCarregando = false;
        this.filtrarIngredientes();
      },
      error: (err) => {
        console.error('Erro ao buscar ingredientes', err);
        this.estaCarregando = false;
      }
    });
  }


  onIngredienteInput(): void {
    
    const ingredienteEncontrado = this.listaTodosIngredientes.find(
      ing => ing.nome.toLowerCase() === this.termoBusca.toLowerCase()
    );

    if (ingredienteEncontrado) {
      this.selecionarIngrediente(ingredienteEncontrado);
    }
  }

  selecionarIngrediente(ingrediente: Ingrediente): void {
   
    this.stateService.listaSelecionada.push(ingrediente);
    this.termoBusca = '';
    this.filtrarIngredientes(); 
  }


  removerIngrediente(ingredienteARemover: Ingrediente): void {
    
    this.stateService.listaSelecionada = this.stateService.listaSelecionada.filter(ing => ing.id !== ingredienteARemover.id);
    this.filtrarIngredientes(); 
  }

  limparSelecao(): void {
   
    this.stateService.limparState();
    this.filtrarIngredientes(); 
  }

  buscarReceitas(): void {
    this.estaCarregando = true;

    this.stateService.buscou = true;
    this.buscou = true;
    
    const idsSelecionados = this.stateService.listaSelecionada.map(ing => ing.id);

    if (idsSelecionados.length === 0) {
      this.stateService.receitasRecomendadas = [];
      this.estaCarregando = false;
      return;
    }

    this.receitaService.recomendarPorIngredientes(idsSelecionados).subscribe({
      next: (data) => {
        this.stateService.receitasRecomendadas = data;
        this.estaCarregando = false;
      },
      error: (err) => {
        console.error('Erro ao recomendar receitas', err);
        this.estaCarregando = false;
      }
    });
  }

  filtrarIngredientes(): void {
    
    const idsSelecionados = new Set(this.stateService.listaSelecionada.map(ing => ing.id));

    this.listaFiltrada = this.listaTodosIngredientes.filter(ingrediente => {
      const naoEstaSelecionado = !idsSelecionados.has(ingrediente.id);
      
      if (this.termoBusca.trim() === '') {
        return naoEstaSelecionado;
      }
      const correspondeABusca = ingrediente.nome.toLowerCase().includes(this.termoBusca.toLowerCase());
      return naoEstaSelecionado && correspondeABusca;
    }).slice(0, 10);
  }
}