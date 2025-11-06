
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
  comentarios: Comentario[] = []; //  Variável para guardar os comentários
  novoComentarioTexto: string = ''; //  Variável para o campo de novo comentário
  receitaId: number | null = null; // Para guardar o ID da receita
  notaSelecionada: number = 0; // Para guardar a nota que o usuário clica
  hoverNota: number = 0;
  minhaNotaSalva: number = 0;
  receitaEstaSalva: boolean = false; // Guarda o estado atual

  constructor(
    private route: ActivatedRoute, // Para ler a URL
    private receitaService: ReceitaService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.receitaId = +idParam; // Guarda o ID

      // Busca os detalhes da receita
      this.receitaService.getReceitaPorId(this.receitaId).subscribe({
        next: (response) => { this.receita = response; },
        error: (err) => { 
          console.error('Erro ao carregar detalhes', err); 
          this.notificationService.show('Erro ao carregar Detalhes', 'error')
        }
      });

      this.buscarDetalhesReceita();

      // Busca os comentários da receita
      this.carregarComentarios(); // Chama a nova função

      this.carregarMinhaClassificacao();

      this.carregarStatusSalvo();
    }
  }

  // 6. Função para carregar comentários
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

  // 7. Função para adicionar um novo comentário
  adicionarComentario(): void {
    if (this.novoComentarioTexto.trim() && this.receitaId) {
      this.receitaService.adicionarComentario(this.receitaId, this.novoComentarioTexto).subscribe({
        next: (novoComentarioAdicionado) => {
          this.notificationService.show('Comentário adicionado!', 'success')
          console.log('Comentário adicionado:', novoComentarioAdicionado);
          // Adiciona o novo comentário à lista exibida na tela
          this.comentarios.push(novoComentarioAdicionado);
          this.novoComentarioTexto = ''; // Limpa o campo
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

  // Funções auxiliares para o efeito das estrelas
  setHoverNota(nota: number): void {
    this.hoverNota = nota;
  }

  setNota(nota: number): void {
    this.notaSelecionada = nota;
    // Poderia chamar this.classificar() diretamente aqui se quisesse
    // que o clique já enviasse a nota, mas vamos manter um botão por clareza.
  }

  // Função para buscar os detalhes (reutilizável)
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
          // Se encontrar, atualiza a nota salva e a selecionada
          this.minhaNotaSalva = response.nota;
          this.notaSelecionada = response.nota; // Pré-seleciona as estrelas
          console.log('Minha classificação carregada:', this.minhaNotaSalva);
        },
        error: (err) => {
          // Se der erro (ex: 404 Not Found), significa que o usuário não avaliou ainda
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
          // Assume como false se der erro (ex: 404 se is-salva não for encontrado)
          this.receitaEstaSalva = false;
          console.error('Erro ao verificar status salvo', err);
        }
      });
    }
  }

  // Função chamada pelo botão para alternar o estado salvo
  toggleSalvarReceita(): void {
    if (!this.receitaId) return;

    if (this.receitaEstaSalva) {
      // Se está salva, remove
      this.receitaService.removerReceitaSalva(this.receitaId).subscribe({
        next: () => {
          this.receitaEstaSalva = false;
          //alert('Receita removida dos seus favoritos!');
          this.notificationService.show('Receita removida dos seus favoritos!', 'success')
        },
        error: (err) => {
          console.error('Erro ao remover receita salva', err);
          this.notificationService.show('Não foi possível remover a receita. Tente novamente.', 'error')
        }
      });
    } else {
      // Se não está salva, salva
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