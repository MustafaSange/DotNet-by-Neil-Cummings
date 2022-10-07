import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  protected user$!: Observable<User | null>;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.user$ = this.accountService.user$;
  }

  protected login(form: NgForm): void {
    this.accountService.login(form.value)
      .subscribe({
        next: response => console.log(response),
        error: error => console.log(error.error)
      });
  }

  protected logout(): void {
    this.accountService.logout();
  }
}
