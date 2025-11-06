import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receita } from '../interfaces/receita';

@Injectable({
  providedIn: 'root'
})
export class Usuario {

  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  // Busca os dados do perfil (Nome, ID, etc.)
  getMeuPerfil(): Observable<any> { // Use 'any' ou a interface UsuarioDTO
    return this.http.get<any>(`${this.apiUrl}/meu-perfil`);
  }

  // Busca as receitas favoritas
  getMinhasReceitasSalvas(): Observable<Receita[]> {
    return this.http.get<Receita[]>(`${this.apiUrl}/meu-perfil/receitas-salvas`);
  }

  // Atualiza o perfil (nome, senha)
  atualizarPerfil(dados: { nome?: string; senha?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/meu-perfil`, dados);
  }

  // Deleta (desativa) a conta
  deletarPerfil(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/meu-perfil`);
  }
  
}
