import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const json = localStorage.getItem('user');
    if (json) {
      const user = JSON.parse(json) as User;
      req = req.clone({ setHeaders: { Authorization: `Bearer ${user.token}` } })
    }

    return next.handle(req);
  }
}
