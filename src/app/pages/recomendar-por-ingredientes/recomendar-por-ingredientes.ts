import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router'; 
import { Receita } from '../../interfaces/receita';
import { Ingrediente, IngredienteService } from '../../services/ingrediente';
import { ReceitaService } from '../../services/receita';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-recomendar-por-ingredientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './recomendar-por-ingredientes.html',
  styleUrls: ['./recomendar-por-ingredientes.css']
})
export class RecomendarPorIngredientes implements OnInit {


  listaTodosIngredientes: Ingrediente[] = []; 
  listaSelecionada: Ingrediente[] = []; 

  termoBusca: string = ''; 


  receitasRecomendadas: Receita[] = [];
  estaCarregando: boolean = true;
  buscou: boolean = false;

  constructor(
    private ingredienteService: IngredienteService,
    private receitaService: ReceitaService,
    private notificationService: NotificationService 
  ) {}

  ngOnInit(): void {
    this.ingredienteService.getIngredientes().subscribe({
      next: (data) => {
        this.listaTodosIngredientes = data; 
        this.estaCarregando = false;
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
    
    const jaSelecionado = this.listaSelecionada.some(ing => ing.id === ingrediente.id);
    
    if (!jaSelecionado) {
      this.listaSelecionada.push(ingrediente);
    } else {
      this.notificationService.show('Ingrediente já selecionado!', 'error');
    }

  
    setTimeout(() => {
      this.termoBusca = '';
    }, 0);
  }


  removerIngrediente(ingredienteARemover: Ingrediente): void {
    this.listaSelecionada = this.listaSelecionada.filter(ing => ing.id !== ingredienteARemover.id);
  }

  limparSelecao(): void {
    this.listaSelecionada = [];
    this.receitasRecomendadas = [];
    this.buscou = false;
  }

  buscarReceitas(): void {
    this.estaCarregando = true;
    this.buscou = true;
    
    const idsSelecionados = this.listaSelecionada.map(ing => ing.id);

    if (idsSelecionados.length === 0) {
      this.receitasRecomendadas = [];
      this.estaCarregando = false;
      return;
    }

    this.receitaService.recomendarPorIngredientes(idsSelecionados).subscribe({
      next: (data) => {
        this.receitasRecomendadas = data;
        this.estaCarregando = false;
      },
      error: (err) => {
        console.error('Erro ao recomendar receitas', err);
        this.estaCarregando = false;
      }
    });
  }
}