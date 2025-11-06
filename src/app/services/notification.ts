import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Interface para o formato da notificação
export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  public notification$ = this.notificationSubject.asObservable();

  constructor() { }

  // Método que os outros componentes chamarão
  show(message: string, type: 'success' | 'error' = 'success') {
    this.notificationSubject.next({ message, type });
  }
}