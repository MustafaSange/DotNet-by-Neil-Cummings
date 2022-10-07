import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private snackBarService: SnackBarService
  ) { }

  canActivate(): Observable<boolean> {
    return this.accountService.user$
      .pipe(
        map(user => {
          if (user) return true;

          this.snackBarService.error('Please login.');
          this.router.navigateByUrl('/');

          return false;
        })
      )
  }
}
