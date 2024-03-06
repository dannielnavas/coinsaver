import { Injectable, Optional, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Optional() private auth = inject(Auth);

  async googleLogin(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async anomymousLogin() {
    return await signInAnonymously(this.auth);
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }
}
