
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
    return this.http.get<Receita[]>(this.apiUrl, { params: params });
  }



  getReceitaPorId(id: number): Observable<ReceitaDetalhe> {
    return this.http.get<ReceitaDetalhe>(`${this.apiUrl}/${id}`);
  }

  getComentarios(receitaId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/${receitaId}/comentarios`);
  }

  adicionarComentario(receitaId: number, texto: string): Observable<Comentario> {
    // O back-end espera um objeto { "texto": "..." }
    const body = { texto: texto };
    return this.http.post<Comentario>(`${this.apiUrl}/${receitaId}/comentarios`, body);
  }

  classificarReceita(receitaId: number, nota: number): Observable<any> {
    const body = { nota: nota };
    return this.http.post(`${this.apiUrl}/${receitaId}/classificar`, body);
  }

  getMinhaClassificacao(receitaId: number): Observable<MinhaClassificacaoResponse> {
    return this.http.get<MinhaClassificacaoResponse>(`${this.apiUrl}/${receitaId}/minha-classificacao`);
  }

  isReceitaSalva(receitaId: number): Observable<IsSalvaResponse> {
    return this.http.get<IsSalvaResponse>(`${this.apiUrl}/${receitaId}/is-salva`);
  }

  salvarReceita(receitaId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${receitaId}/salvar`, {}); // Corpo vazio
  }

  removerReceitaSalva(receitaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${receitaId}/salvar`);
  }

  getMinhasReceitas(): Observable<Receita[]> {
    return this.http.get<Receita[]>(`${this.apiUrl}/minhas-receitas`);
  }

  searchReceitas(termo: string): Observable<Receita[]> {
    let params = new HttpParams().set('q', termo);

    return this.http.get<Receita[]>(`${this.apiUrl}/search`, { params: params });
  }

  criarReceita(formData: FormData): Observable<ReceitaDetalhe> {
      return this.http.post<ReceitaDetalhe>(this.apiUrl, formData);
    }

  recomendarPorIngredientes(ids: number[]): Observable<Receita[]> {
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('ingredientes', id.toString());
    });

    return this.http.get<Receita[]>(`${this.apiUrl}/recomendadas`, { params: params });
  }

  deleteReceita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateReceita(id: number, formData: FormData): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, formData);
    }

  getDietasDisponiveis(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/dietas`);
  }
}