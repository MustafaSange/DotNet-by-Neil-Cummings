import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent implements OnInit {

  protected validationErrors: string[] = [];
  private readonly baseURL = 'https://localhost:5001/api';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  protected get404Error() {
    const url = `${this.baseURL}/buggy/not-found`;

    this.http.get(url).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  protected get400Error() {
    const url = `${this.baseURL}/buggy/bad-request`;

    this.http.get(url).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  protected get500Error() {
    const url = `${this.baseURL}/buggy/server-error`;

    this.http.get(url).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  protected get401Error() {
    const url = `${this.baseURL}/buggy/auth`;

    this.http.get(url).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  protected get400ValidationError() {
    const url = `${this.baseURL}/account/register`;

    this.http.post(url, {}).subscribe({
      next: response => console.log(response),
      error: errors => this.validationErrors = errors
    });
  }
}
