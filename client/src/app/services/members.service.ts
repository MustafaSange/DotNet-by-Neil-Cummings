import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member.model';

@Injectable({providedIn: 'root'})
export class MembersService {
  private readonly baseURL = environment.apiURL;
  private members: Member[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getMembers(): Observable<Member[]> {
    if (this.members.length) return of(this.members);

    const url = `${this.baseURL}/users`;
    return this.http.get<Member[]>(url)
      .pipe(
        tap(members => this.members = members)
      );
  }

  getMember(userName: string): Observable<Member> {
    const member = this.members.find(m => m.userName === userName);
    if (member) return of(member);

    const url = `${this.baseURL}/users/${userName}`;
    return this.http.get<Member>(url);
  }

  updateMember(member: Member) {
    const url = `${this.baseURL}/users`;

    return this.http.put(url, member)
      .pipe(
        tap(() => {
          const index = this.members.findIndex(m => m.userName === member.userName);
          this.members[index] = { ...this.members[index], ...member };
        })
      );
  }
}
