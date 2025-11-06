import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../services/usuario';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-perfil-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Adicionar FormsModule e RouterLink
  templateUrl: './perfil-editar.html',
  styleUrls: ['./perfil-editar.css']
})
export class PerfilEditar implements OnInit {
  
  dadosPerfil = {
    nome: '',
    senha: '' 
  };
  
  constructor(
    private usuarioService: Usuario,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Busca os dados atuais para preencher o nome
    this.usuarioService.getMeuPerfil().subscribe({
      next: (data) => {
        this.dadosPerfil.nome = data.nome;
      },
      error: (err) => console.error('Erro ao buscar perfil', err)
    });
  }

  onSubmit(): void {
    // Prepara os dados para enviar. Só envia a senha se o usuário digitou uma nova.
    const dadosParaAtualizar: { nome?: string; senha?: string } = {
      nome: this.dadosPerfil.nome
    };
    
    if (this.dadosPerfil.senha.trim()) {
      dadosParaAtualizar.senha = this.dadosPerfil.senha;
    }

    this.usuarioService.atualizarPerfil(dadosParaAtualizar).subscribe({
      next: () => {
        
        this.notificationService.show('Perfil atualizado com sucesso!', 'success')
        //this.router.navigate(['/perfil']); // Volta para o dashboard
      },
      error: (err) => {
        console.error('Erro ao atualizar perfil', err);

        this.notificationService.show('Não foi possível atualizar o perfil. Tente novamente.', 'error')

      }
    });
  }
}
