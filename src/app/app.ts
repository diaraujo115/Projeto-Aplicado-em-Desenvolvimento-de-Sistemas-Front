// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para *ngIf
import { RouterOutlet, RouterLink, Router } from '@angular/router'; // Importante para <router-outlet>
import { FormsModule } from '@angular/forms'; // Importante para [(ngModel)]
import { Auth } from './services/auth';
import { NotificationComponent } from './components/notification/notification';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule, NotificationComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'receitas-despensa-frontend';
  searchTerm: string = '';

  constructor(private authService: Auth, private router: Router) {}

  // Método que será chamado pelo HTML
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onLogout(): void {
    this.authService.logout();
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      console.log('Buscando por:', this.searchTerm);
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    } else {
      alert('Digite algo para pesquisar!');
    }
  }
}