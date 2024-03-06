import { Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  dataUser$: BehaviorSubject<UserCredential | null> =
    new BehaviorSubject<UserCredential | null>(null);

  setUser(data: UserCredential) {
    sessionStorage.setItem('user', JSON.stringify(data));
    this.dataUser$.next(data);
  }
  getUser(): BehaviorSubject<UserCredential | null> {
    if (this.dataUser$.value === null)
      this.dataUser$.next(JSON.parse(sessionStorage.getItem('user') || '{}'));
    return this.dataUser$;
  }
}
