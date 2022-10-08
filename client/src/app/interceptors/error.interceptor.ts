import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(error => {
          switch (error.status) {
            case 400:
              if (error.error?.errors) {
                const errors = error.error.errors;
                const modalStateErrors = [];
                for (const key in errors) {
                  modalStateErrors.push(errors[key]);
                }
                throw modalStateErrors.flat();
              } else {
                this.snackBarService.error(error.error);
              }
              break;

            case 401: {
              this.snackBarService.error(error.error);
              break;
            }

            case 404: {
              this.router.navigateByUrl('/not-found');
              break;
            }

            case 500: {
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            }

            default:
              this.snackBarService.error('Something unexpected went wrong.');
              console.log(error);
              break;
          }

          return throwError(() => error);
        })
      );
  }
}
