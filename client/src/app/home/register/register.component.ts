import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<void>();

  protected model: any = {};

  constructor(
    private accountService: AccountService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  protected register(): void {
    this.accountService.register(this.model)
      .subscribe({
        next: _ => this.cancel(),
        error: error => this.snackBarService.error(error.error)
      });
  }

  protected cancel(): void {
    this.cancelRegister.emit();
  }
}
