import { Component, Optional } from '@angular/core';
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

  constructor(
    @Optional() private auth: Auth,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

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
    console.log(data);
    sessionStorage.setItem('user', JSON.stringify(data));
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
    console.log(user);
    await this.router.navigate(this.redirect);
  }
}
