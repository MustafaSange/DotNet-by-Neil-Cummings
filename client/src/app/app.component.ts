import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any = [];

  constructor(
    private http: HttpClient
  ) { }


  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    const url = 'https://localhost:5001/api/users';
    this.http.get(url)
      .subscribe({
        next: users => this.users = users,
        error: error => console.log(error)
      });
  }
}
