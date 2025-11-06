import { Component, OnInit } from '@angular/core';
import { Receita } from '../../interfaces/receita';
import { ReceitaService } from '../../services/receita';
import { Usuario } from '../../services/usuario';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {
  minhasReceitas: Receita[] = [];
  receitasSalvas: Receita[] = [];

  confirmandoDelete: boolean = false;

  constructor(
    private receitaService: ReceitaService,
    private usuarioService: Usuario,
    private authService: Auth,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Buscar as receitas criadas
    this.receitaService.getMinhasReceitas().subscribe({
      next: (data) => this.minhasReceitas = data,
      error: (err) => console.error('Erro ao buscar minhas receitas', err)
    });

    // Buscar as receitas salvas
    this.usuarioService.getMinhasReceitasSalvas().subscribe({
      next: (data) => this.receitasSalvas = data,
      error: (err) => console.error('Erro ao buscar receitas salvas', err)
    });
  }

  deletarConta(): void {
    // Exibe o aviso de confirmação
    const confirmacao = window.confirm('Você tem certeza que deseja desativar sua conta? Esta ação não pode ser desfeita.');
    
    if (confirmacao) {
      this.usuarioService.deletarPerfil().subscribe({
        next: () => {
          
         this.notificationService.show('Conta desativada com sucesso!', 'success')

          // Faz o logout e redireciona para o login
          this.authService.logout();
        },
        error: (err) => {
          console.error('Erro ao deletar conta', err);
          this.notificationService.show('Não foi possível desativar sua conta. Tente novamente.', 'error')
        }
      });
    }
  }

  iniciarConfirmacaoDelete(): void {
    this.confirmandoDelete = true;
  }

  // 5. Esta função CANCELA
  cancelarDelete(): void {
    this.confirmandoDelete = false;
  }

  // 6. Esta é a lógica de delete que você já tinha, agora renomeada
  confirmarDelete(): void {
    // A confirmação já aconteceu (o usuário clicou no botão "Sim")
    this.usuarioService.deletarPerfil().subscribe({
      next: () => {
        // Usa o NotificationService no lugar do alert
        this.notificationService.show('Conta desativada com sucesso.', 'success');
        this.authService.logout();
      },
      error: (err) => {
        console.error('Erro ao deletar conta', err);
        // Usa o NotificationService
        this.notificationService.show('Não foi possível desativar sua conta. Tente novamente.', 'error');
        // Esconde o aviso de confirmação
        this.confirmandoDelete = false;
      }
    });
  }
}