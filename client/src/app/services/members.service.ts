import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member.model';

@Injectable({providedIn: 'root'})
export class MembersService {
  private readonly baseURL = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  getMembers(): Observable<Member[]> {
    const url = `${this.baseURL}/users`;

    return this.http.get<Member[]>(url);
  }

  getMember(userName: string): Observable<Member> {
    const url = `${this.baseURL}/users/${userName}`;

    return this.http.get<Member>(url);
  }
}
