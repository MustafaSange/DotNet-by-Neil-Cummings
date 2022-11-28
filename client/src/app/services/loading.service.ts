import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoadingService {

  private loading = new BehaviorSubject<number>(0);
  get isLoading$() { return this.loading.asObservable() }

  show() {
    const value = this.loading.getValue() + 1;
    this.loading.next(value);
  }

  hide() {
    const value = this.loading.getValue() - 1;
    this.loading.next(value);
  }
}
