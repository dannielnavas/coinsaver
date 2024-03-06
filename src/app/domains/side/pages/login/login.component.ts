import { AuthService } from '@/app/shared/services/auth.service';
import { SessionService } from '@/app/shared/services/session.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  redirect = [`/dashboard`];
  loginFrom!: FormGroup;
  private sessionService = inject(SessionService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin() {
    this.loginFrom = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  async loginWithGoogle() {
    const response = await this.authService.googleLogin();
    this.sessionService.setUser(response);
    this.router.navigate(this.redirect);
  }

  async loginAnonymously() {
    await this.authService.anomymousLogin();
    this.router.navigate(this.redirect);
  }

  async loginWithEmailAndPassword() {
    await this.authService.loginWithEmailAndPassword(
      this.loginFrom.controls['email'].getRawValue(),
      this.loginFrom.controls['password'].getRawValue()
    );
    this.router.navigate(this.redirect);
  }
}
