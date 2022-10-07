import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  registerMode = false;

  constructor( ) { }

  protected cancelRegisterMode(): void {
    this.registerMode = false;
  }

  protected registerToggle(): void {
    this.registerMode = !this.registerMode;
  }
}
