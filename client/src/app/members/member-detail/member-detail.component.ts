import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  member$!: Observable<Member>;

  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadMember();
  }

  private loadMember(): void {
    const userName = this.route.snapshot.paramMap.get('userName')!;
    this.member$ = this.membersService.getMember(userName);
  }
}
