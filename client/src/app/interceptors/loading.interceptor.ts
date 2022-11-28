import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, finalize, delay } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { IS_NOT_LOADING } from '../token/loading.token';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isNotLoading = req.context.get(IS_NOT_LOADING);
    if (!isNotLoading) this.loadingService.show();

    return next.handle(req)
      .pipe(
        delay(1000),
        finalize(() => {
          if (!isNotLoading) this.loadingService.hide();
        })
      );
  }
}
