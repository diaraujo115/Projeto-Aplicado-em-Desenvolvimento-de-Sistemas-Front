import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar
import { CommonModule } from '@angular/common'; // Importar
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  dadosLogin = {
    email: '',
    senha: ''
  };

  constructor(private authService: Auth, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.dadosLogin).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        // Salva o token no armazenamento local do navegador
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Falha no login', err);
        alert('Email ou senha incorretos.');
      }
    });
  }

}
