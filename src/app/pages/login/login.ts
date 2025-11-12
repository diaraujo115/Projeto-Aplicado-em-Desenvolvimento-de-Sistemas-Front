import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification';

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

  constructor(
    private authService: Auth, 
    private router: Router, 
    private notificationService: NotificationService) {}

  onSubmit(): void {
    this.authService.login(this.dadosLogin).subscribe({
      next: (response) => {
        this.notificationService.show('Login realizado com sucesso!', 'success');
        // Salva o token no armazenamento local do navegador
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Falha no login', err);
        this.notificationService.show('Email ou senha incorretos.', 'error');
      }
    });
  }

}
