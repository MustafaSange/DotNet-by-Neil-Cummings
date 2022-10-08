import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  protected user$!: Observable<User | null>;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.user$ = this.accountService.user$;
  }

  protected login(form: NgForm): void {
    this.accountService.login(form.value)
      .subscribe( _ => this.router.navigateByUrl('/members'));
  }

  protected logout(): void {
    this.accountService.logout();
  }
}
