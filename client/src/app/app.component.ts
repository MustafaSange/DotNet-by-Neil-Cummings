import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';

  constructor(
    private accountService: AccountService
  ) { }


  ngOnInit() {
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
}
