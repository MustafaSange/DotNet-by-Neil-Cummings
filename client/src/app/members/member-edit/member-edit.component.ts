import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/models/can-component-deactivate.model';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/services/members.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit, CanComponentDeactivate {

  @ViewChild('form') form!:NgForm;
  protected member!: Member;

  constructor(
    private route: ActivatedRoute,
    private membersService: MembersService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.loadMember();
  }

  @HostListener('window:beforeunload', ['$event']) unloadNotifcation($event: any) {
    if (this.form.dirty) {
      $event.returnValue = true;
    }
  }

  canDeactivate(): boolean {
    return this.form.dirty || false;
  }

  protected update() {
    this.membersService.updateMember(this.form.value)
      .subscribe( _ => {
        this.snackBarService.info('Profile updated successfully.');
        this.form.reset(this.member);
      });
  }

  private loadMember() {
    const userName = this.route.snapshot.paramMap.get('userName')!;
    this.membersService.getMember(userName)
      .subscribe(member => this.member = member)
  }
}
