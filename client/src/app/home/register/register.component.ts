import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<void>();

  protected model: any = {};

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  protected register(): void {
    this.accountService.register(this.model)
      .subscribe({
        next: _ => this.cancel(),
        error: error => console.log(error)
      });
  }

  protected cancel(): void {
    this.cancelRegister.emit();
  }
}
