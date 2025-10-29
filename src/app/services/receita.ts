
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receita, ReceitaDetalhe,Comentario } from '../interfaces/receita';

interface MinhaClassificacaoResponse {
  nota: number;
}

interface IsSalvaResponse {
  salva: boolean;
}

export interface FiltrosReceita {
  categoria?: string;
  dieta?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private apiUrl = 'http://localhost:8080/api/receitas';

  constructor(private http: HttpClient) { }

  getReceitas(filtros?: FiltrosReceita): Observable<Receita[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.categoria) {
        params = params.set('categoria', filtros.categoria);
      }
      if (filtros.dieta) {
        params = params.set('dieta', filtros.dieta);
      }
    }
    // Envia os parâmetros na requisição GET
    return this.http.get<Receita[]>(this.apiUrl, { params: params });
  }

  // getReceitas(): Observable<Receita[]> {
  //   return this.http.get<Receita[]>(this.apiUrl);
  // }

  getReceitaPorId(id: number): Observable<ReceitaDetalhe> {
    return this.http.get<ReceitaDetalhe>(`${this.apiUrl}/${id}`);
  }

  // Busca os comentários de uma receita específica
  getComentarios(receitaId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/${receitaId}/comentarios`);
  }

  // Adiciona um novo comentário a uma receita
  adicionarComentario(receitaId: number, texto: string): Observable<Comentario> {
    // O back-end espera um objeto { "texto": "..." }
    const body = { texto: texto };
    return this.http.post<Comentario>(`${this.apiUrl}/${receitaId}/comentarios`, body);
  }

  classificarReceita(receitaId: number, nota: number): Observable<any> {
    // O back-end espera um objeto { "nota": X }
    const body = { nota: nota };
    return this.http.post(`${this.apiUrl}/${receitaId}/classificar`, body);
  }

  getMinhaClassificacao(receitaId: number): Observable<MinhaClassificacaoResponse> {
    return this.http.get<MinhaClassificacaoResponse>(`${this.apiUrl}/${receitaId}/minha-classificacao`);
  }

  isReceitaSalva(receitaId: number): Observable<IsSalvaResponse> {
    return this.http.get<IsSalvaResponse>(`${this.apiUrl}/${receitaId}/is-salva`);
  }

  // Salva a receita (adiciona aos favoritos)
  salvarReceita(receitaId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${receitaId}/salvar`, {}); // Corpo vazio
  }

  // Remove a receita dos salvos (remove dos favoritos)
  removerReceitaSalva(receitaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${receitaId}/salvar`);
  }
}