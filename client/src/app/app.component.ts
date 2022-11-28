import { Component, OnInit } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { User } from './models/user.model';
import { AccountService } from './services/account.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';

  isLoading$!: Observable<number>;

  constructor(
    private accountService: AccountService,
    private loadingService: LoadingService
  ) { }


  ngOnInit() {
    this.setIsLoading();
    this.setUser();
  }

  private setUser() {
    let user: User | null = null;
    const userString = localStorage.getItem('user');
    if (userString) {
      user = JSON.parse(userString);
    }
    this.accountService.setUser(user);
  }

  private setIsLoading() {
    this.isLoading$ = this.loadingService.isLoading$
      .pipe(
        delay(0)
      );
  }
}
