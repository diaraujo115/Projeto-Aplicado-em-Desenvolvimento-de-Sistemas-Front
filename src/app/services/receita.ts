
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receita, ReceitaDetalhe } from '../interfaces/receita';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private apiUrl = 'http://localhost:8080/api/receitas';

  constructor(private http: HttpClient) { }

  
  getReceitas(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.apiUrl);
  }

  getReceitaPorId(id: number): Observable<ReceitaDetalhe> {
    return this.http.get<ReceitaDetalhe>(`${this.apiUrl}/${id}`);
  }
}