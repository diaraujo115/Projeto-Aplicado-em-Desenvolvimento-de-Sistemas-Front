
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receita } from '../interfaces/receita';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private apiUrl = 'http://localhost:8080/api/receitas';

  constructor(private http: HttpClient) { }

  
  getReceitas(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.apiUrl);
  }
}