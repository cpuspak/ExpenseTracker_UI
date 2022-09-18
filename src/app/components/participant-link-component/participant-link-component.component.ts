import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { GlobalUsersService } from 'src/app/services/global-users.service/global-users.service';
import { EventsService } from 'src/app/services/events.service/events.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventAddComponent } from '../event-add/event-add.component';

@Component({
  selector: 'app-participant-link-component',
  templateUrl: './participant-link-component.component.html',
  styleUrls: ['./participant-link-component.component.css']
})
export class ParticipantLinkComponentComponent implements OnInit, AfterViewInit {

  participants: any = []
  allSelected: boolean = false
  guestUserName: string = ""

  constructor(private globalUsersService: GlobalUsersService,
            @Inject(MAT_DIALOG_DATA) public data: {"eventName":""},
            private eventsService: EventsService,
            public dialogRef: MatDialogRef<EventAddComponent>) { }

  ngOnInit(): void {

    this.globalUsersService.getEventSpecificParticipantList(this.data.eventName).subscribe((res: any) => {
      if(res && res.EventParticipants) {
        this.participants = res.EventParticipants
        this.participants.forEach((participant: any) => {
          participant.selected = true
          participant.disabled = true
        })
        this.sendParticipantList()
      }
    })
  }

  ngAfterViewInit(): void {

    this.globalUsersService.temporaryParticipantTrigger.subscribe((res: any) => {
      console.log(res, "from destination of pipe", this.participants)
      this.participants.push({
        "id": res.id,
        "username": res.username,
        "selected": false,
        "disabled": false
      })
      this.sendParticipantList()
    })
  }

  sendParticipantList(){
    this.globalUsersService.triggerCurrentParticipantList.next(this.participants);
  }


  valueChange(name: any, event: any){
    this.participants.forEach((element: any) => {
      if(element['name'] == name) element['selected'] = event.checked
    });
  }

  setAll(event: any){
    this.allSelected = !this.allSelected
    this.participants.forEach((element: any) => {
      if (!element['disabled'])
        element['selected'] = this.allSelected
    });
  }

  addSelectedParticipantsToEvent() {
    var localParticipantList: any = []
    this.participants.forEach((element: any) => {
      if (element.selected && !element.disabled) localParticipantList.push(element.username)
    })
    this.eventsService.addParticipantsToEvent(this.data.eventName, localParticipantList).subscribe((res: any) => {
      this.globalUsersService.eventParticipantsFetchTrigger.next(this.data.eventName)
    },
    err => console.log("internal server error"))
    this.closeOverlay()
    
  }

  findWhetherAnySelected(){
    var returnVal: boolean = false
    this.participants.forEach((element: any) => {
      if(element.selected && element.disabled == false) {
        returnVal = true;
      }
    });
    
    return returnVal;
  }

  addGuestParticipant(){
    console.log(this.guestUserName)
    this.globalUsersService.addGuestParticipant(this.guestUserName).subscribe((res: any) => {
      this.globalUsersService.eventParticipantsFetchTrigger.next(this.data.eventName)
    })

  }


  closeOverlay(){
    this.dialogRef.close()
  }


}
