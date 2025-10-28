import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient, private router: Router) { }

  login(dadosLogin: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, dadosLogin);
  }

  cadastrar(dadosCadastro: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, dadosCadastro);
  }

  // Pega o token salvo no localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Verifica se o usuário está logado (baseado na existência do token)
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Remove o token e redireciona para o login
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

}
