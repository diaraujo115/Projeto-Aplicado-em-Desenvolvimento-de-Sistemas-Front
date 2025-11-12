
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Importar ActivatedRoute
import { CommonModule } from '@angular/common';
import { ReceitaService } from '../../services/receita';
import { ReceitaDetalhe, Comentario } from '../../interfaces/receita';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-receita-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './receita-detalhe.html',
  styleUrls: ['./receita-detalhe.css']
})
export class ReceitaDetalheComponent implements OnInit {

  receita: ReceitaDetalhe | null = null;
  comentarios: Comentario[] = []; 
  novoComentarioTexto: string = ''; 
  receitaId: number | null = null; 
  notaSelecionada: number = 0; 
  hoverNota: number = 0;
  minhaNotaSalva: number = 0;
  receitaEstaSalva: boolean = false; 

  constructor(
    private route: ActivatedRoute, 
    private receitaService: ReceitaService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.receitaId = +idParam; 

      this.receitaService.getReceitaPorId(this.receitaId).subscribe({
        next: (response) => { this.receita = response; },
        error: (err) => { 
          console.error('Erro ao carregar detalhes', err); 
          this.notificationService.show('Erro ao carregar Detalhes', 'error')
        }
      });

      this.buscarDetalhesReceita();

      this.carregarComentarios(); 

      this.carregarMinhaClassificacao();

      this.carregarStatusSalvo();
    }
  }

  carregarComentarios(): void {
    if (this.receitaId) {
      this.receitaService.getComentarios(this.receitaId).subscribe({
        next: (response) => { this.comentarios = response; },
        error: (err) => { 
          console.error('Erro ao carregar comentários', err);
          this.notificationService.show('Erro ao carregar comentários', 'error')
        
        }
      });
    }
  }

  adicionarComentario(): void {
    if (this.novoComentarioTexto.trim() && this.receitaId) {
      this.receitaService.adicionarComentario(this.receitaId, this.novoComentarioTexto).subscribe({
        next: (novoComentarioAdicionado) => {
          this.notificationService.show('Comentário adicionado!', 'success')
          console.log('Comentário adicionado:', novoComentarioAdicionado);
          this.comentarios.push(novoComentarioAdicionado);
          this.novoComentarioTexto = ''; 
        },
        error: (err) => {
          console.error('Erro ao adicionar comentário', err);
          alert('Não foi possível adicionar o comentário. Tente novamente.');
        }
      });
    }
  }

  classificar(): void {
    if (this.receitaId && this.notaSelecionada > 0) {
      this.receitaService.classificarReceita(this.receitaId, this.notaSelecionada).subscribe({
        next: (response) => {
          console.log('Classificação enviada:', response);
          
          this.notificationService.show(`Você avaliou esta receita com ${this.notaSelecionada} estrela(s)!`, 'success')

           this.buscarDetalhesReceita() 
        },
        error: (err) => {
          console.error('Erro ao classificar', err);
          this.notificationService.show('Não foi possível enviar sua avaliação. Tente novamente.', 'error')
        }
      });
    } else {
      
      this.notificationService.show('Por favor, selecione uma nota (clique em uma estrela) antes de avaliar.', 'error')
    }
  }

  setHoverNota(nota: number): void {
    this.hoverNota = nota;
  }

  setNota(nota: number): void {
    this.notaSelecionada = nota;
    
  }

  buscarDetalhesReceita(): void {
      if(this.receitaId) {
          this.receitaService.getReceitaPorId(this.receitaId).subscribe({
            next: (response) => { this.receita = response; },
            error: (err) => { 
              console.error('Erro ao recarregar detalhes', err);
              this.notificationService.show('Erro ao recarregar detalhes', 'error')
             }
          });
      }
  }

  carregarMinhaClassificacao(): void {
    if (this.receitaId) {
      this.receitaService.getMinhaClassificacao(this.receitaId).subscribe({
        next: (response) => {
          this.minhaNotaSalva = response.nota;
          this.notaSelecionada = response.nota; 
          console.log('Minha classificação carregada:', this.minhaNotaSalva);
        },
        error: (err) => {
          this.minhaNotaSalva = 0;
          this.notaSelecionada = 0;
          
        }
      });
    }
  }

  carregarStatusSalvo(): void {
    if (this.receitaId) {
      this.receitaService.isReceitaSalva(this.receitaId).subscribe({
        next: (response) => {
          this.receitaEstaSalva = response.salva;
          console.log('Status salvo carregado:', this.receitaEstaSalva);
        },
        error: (err) => {
          this.receitaEstaSalva = false;
          console.error('Erro ao verificar status salvo', err);
        }
      });
    }
  }

  toggleSalvarReceita(): void {
    if (!this.receitaId) return;

    if (this.receitaEstaSalva) {
      this.receitaService.removerReceitaSalva(this.receitaId).subscribe({
        next: () => {
          this.receitaEstaSalva = false;
          this.notificationService.show('Receita removida dos seus favoritos!', 'success')
        },
        error: (err) => {
          console.error('Erro ao remover receita salva', err);
          this.notificationService.show('Não foi possível remover a receita. Tente novamente.', 'error')
        }
      });
    } else {
      this.receitaService.salvarReceita(this.receitaId).subscribe({
        next: () => {
          this.receitaEstaSalva = true;
          this.notificationService.show('Receita salva nos seus favoritos!', 'success')
        },
        error: (err) => {
          console.error('Erro ao salvar receita', err);
          this.notificationService.show('Erro ao salvar receita', 'error')
        }
      });
    }
  }

}