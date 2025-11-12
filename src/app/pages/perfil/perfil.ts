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
    this.receitaService.getMinhasReceitas().subscribe({
      next: (data) => this.minhasReceitas = data,
      error: (err) => console.error('Erro ao buscar minhas receitas', err)
    });

    this.usuarioService.getMinhasReceitasSalvas().subscribe({
      next: (data) => this.receitasSalvas = data,
      error: (err) => console.error('Erro ao buscar receitas salvas', err)
    });
  }

  deletarConta(): void {
    const confirmacao = window.confirm('Você tem certeza que deseja desativar sua conta? Esta ação não pode ser desfeita.');
    
    if (confirmacao) {
      this.usuarioService.deletarPerfil().subscribe({
        next: () => {
          
         this.notificationService.show('Conta desativada com sucesso!', 'success')

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

  cancelarDelete(): void {
    this.confirmandoDelete = false;
  }

  confirmarDelete(): void {
    this.usuarioService.deletarPerfil().subscribe({
      next: () => {
        this.notificationService.show('Conta desativada com sucesso.', 'success');
        this.authService.logout();
      },
      error: (err) => {
        console.error('Erro ao deletar conta', err);
        this.notificationService.show('Não foi possível desativar sua conta. Tente novamente.', 'error');
        this.confirmandoDelete = false;
      }
    });
  }

  onDeletarReceita(id: number): void {
    const confirmar = window.confirm('Tem certeza que deseja deletar esta receita? Esta ação é permanente.');

    if (confirmar) {
      this.receitaService.deleteReceita(id).subscribe({
        next: () => {
          this.notificationService.show('Receita deletada com sucesso!', 'success');
          this.minhasReceitas = this.minhasReceitas.filter(r => r.id !== id);
        },
        error: (err) => {
          console.error('Erro ao deletar receita', err);
          this.notificationService.show(err.error.message || 'Erro ao deletar receita.', 'error');
        }
      });
    }
  }
}