import { IUserGoogle } from '@/app/shared/models/user-google.model';
import { SessionService } from '@/app/shared/services/session.service';
import { Component, Optional, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
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
  @Optional() private auth = inject(Auth);

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
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(this.auth, provider);
    this.sessionService.setUser(data as unknown as IUserGoogle);
    await this.router.navigate(this.redirect);
  }

  async loginAnonymously() {
    await signInAnonymously(this.auth);
    await this.router.navigate(this.redirect);
  }

  async loginWithEmailAndPassword() {
    const user = await signInWithEmailAndPassword(
      this.auth,
      this.loginFrom.controls['email'].getRawValue(),
      this.loginFrom.controls['password'].getRawValue()
    );
    await this.router.navigate(this.redirect);
  }
}
