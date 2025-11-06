import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Notification, NotificationService } from '../../services/notification';


@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrls: ['./notification.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  message: string = '';
  type: 'success' | 'error' = 'success';
  isVisible: boolean = false;
  private notificationSubscription: Subscription | undefined;
  private timer: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.notification$
      .subscribe((notification: Notification) => {
        this.message = notification.message;
        this.type = notification.type;
        this.isVisible = true;

        // Limpa o timer anterior se uma nova notificação chegar
        if (this.timer) {
          clearTimeout(this.timer);
        }

        // Esconde a notificação após 5 segundos
        this.timer = setTimeout(() => {
          this.isVisible = false;
        }, 5000);
      });
  }

  ngOnDestroy(): void {
    this.notificationSubscription?.unsubscribe();
  }
}