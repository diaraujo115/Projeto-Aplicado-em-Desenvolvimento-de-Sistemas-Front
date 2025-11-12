import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router'; 
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class Cadastro{
  dadosCadastro = {
    nome: '',
    email: '',
    senha: ''
  };

  constructor(private authService: Auth, private router: Router, private notificationService: NotificationService) {}

  onSubmit(): void {
    this.authService.cadastrar(this.dadosCadastro).subscribe({
      next: (response) => {
        this.notificationService.show('Cadastro realizado com sucesso!', 'success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Falha no cadastro', err)
        this.notificationService.show('Falha ao realizar o cadastro.', 'error');
      }
    });
  }
}