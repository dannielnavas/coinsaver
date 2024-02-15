import { Component, Optional } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  redirect = [`/dashboard`];

  constructor(@Optional() private auth: Auth, private router: Router) {}

  ngOnInit(): void {}

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(this.auth, provider);
    console.log(data);
    await this.router.navigate(this.redirect);
  }

  async loginAnonymously() {
    await signInAnonymously(this.auth);
    await this.router.navigate(this.redirect);
  }

  async loginWithEmailAndPassword() {
    // const data = await createUserWithEmailAndPassword(
    //   this.auth,
    //   'darker13@outlook.com',
    //   '1602003139Odin!'
    // );
    // console.log(data);
    const user = await signInWithEmailAndPassword(
      this.auth,
      'darker13@outlook.com',
      '1602003139Odin!'
    );
    console.log(user);
    await this.router.navigate(this.redirect);
  }
}
