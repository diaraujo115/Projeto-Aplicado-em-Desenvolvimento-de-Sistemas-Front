// src/app/services/recomendacao-state.service.ts
import { Injectable } from '@angular/core';
import { Receita } from '../interfaces/receita';
import { Ingrediente, IngredienteService } from './ingrediente';


@Injectable({
  providedIn: 'root'
})
export class RecomendacaoStateService {


  public listaSelecionada: Ingrediente[] = [];
  public receitasRecomendadas: Receita[] = [];
  public buscou: boolean = false;

  constructor() { }

  
  limparState(): void {
    this.listaSelecionada = [];
    this.receitasRecomendadas = [];
    this.buscou = false;
  }
}