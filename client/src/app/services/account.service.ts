import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly baseURL = 'https://localhost:5001/api';
  private user = new ReplaySubject<User | null>(1);
  get user$() { return  this.user.asObservable(); }

  constructor(
    private http: HttpClient
  ) { }

  login(model: any) {
    const url = `${this.baseURL}/account/login`;

    return this.http.post<User>(url, model)
      .pipe(
        tap(this.setCurrentUser.bind(this))
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
  }

  register(user: User) {
    const url = `${this.baseURL}/account/register`;

    return this.http.post<User>(url, user)
      .pipe(
        tap(this.setCurrentUser.bind(this))
      );
  }

  setUser(user: User | null) {
    this.user.next(user);
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.setUser(user);
  }
}
