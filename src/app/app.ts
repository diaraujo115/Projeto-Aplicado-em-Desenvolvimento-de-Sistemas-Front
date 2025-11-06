// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para *ngIf
import { RouterOutlet, RouterLink, Router, NavigationEnd} from '@angular/router'; // Importante para <router-outlet>
import { FormsModule } from '@angular/forms'; // Importante para [(ngModel)]
import { Auth } from './services/auth';
import { NotificationComponent } from './components/notification/notification';
import { filter } from 'rxjs/operators';


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

  public isAuthPage: boolean = false;

  constructor(private authService: Auth, private router: Router) {


  this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/login') || event.url.includes('/cadastro')) {
          this.isAuthPage = true;
        } else {
          this.isAuthPage = false;
        }
      }
    });
  }


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