import { NavbarComponent } from '@/app/shared/components/navbar/navbar.component';
import { SessionService } from '@/app/shared/services/session.service';
import { Component, inject, signal } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private sessionService = inject(SessionService);
  user = signal<UserCredential | null>(null);

  ngOnInit() {
    this.getDataUser();
  }

  async getDataUser() {
    const user = await this.sessionService.getUser();
    this.user.set(user.value); // Extract the value from the BehaviorSubject
  }
}
