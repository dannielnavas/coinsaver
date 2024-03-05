import { Injectable } from '@angular/core';
import { IUserGoogle } from '../models/user-google.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  setUser(data: IUserGoogle) {
    sessionStorage.setItem('user', JSON.stringify(data));
  }
  getUser(): IUserGoogle {
    const user = sessionStorage.getItem('user');
    return JSON.parse(user as string);
  }
  removeUser() {
    sessionStorage.removeItem('user');
  }
}
