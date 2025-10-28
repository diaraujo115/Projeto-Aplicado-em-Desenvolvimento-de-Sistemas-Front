import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class Cadastro{
  dadosCadastro = {
    nome: '',
    email: '',
    senha: ''
  };

  // Injetar o Router
  constructor(private authService: Auth, private router: Router) {}

  onSubmit(): void {
    this.authService.cadastrar(this.dadosCadastro).subscribe({
      next: (response) => {
        console.log('Cadastro bem-sucedido!', response);
        alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Falha no cadastro', err)
        // pode adicionar uma lógica mais inteligente
        // para verificar o tipo de erro (ex: email já existe)
        alert('Falha ao realizar o cadastro. Verifique seus dados.');
      }
    });
  }
}