import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  members$!: Observable<Member[]>

  constructor(
    private membersService: MembersService
  ) { }

  ngOnInit(): void {
    this.members$ = this.membersService.getMembers();
  }

}
