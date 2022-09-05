import { Component, OnInit, Inject } from '@angular/core';
import { GlobalUsersService } from 'src/app/services/global-users.service/global-users.service';
import { EventsService } from 'src/app/services/events.service/events.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventAddComponent } from '../event-add/event-add.component';

@Component({
  selector: 'app-participant-link-component',
  templateUrl: './participant-link-component.component.html',
  styleUrls: ['./participant-link-component.component.css']
})
export class ParticipantLinkComponentComponent implements OnInit {

  participants: any = []
  eventName: string = ""
  allSelected: boolean = false
  constructor(private globalUsersService: GlobalUsersService,
            @Inject(MAT_DIALOG_DATA) public data: {"eventName":""},
            private eventsService: EventsService,
            public dialogRef: MatDialogRef<EventAddComponent>) { }

  ngOnInit(): void {
    this.globalUsersService.getGlobalListOfUsers().subscribe((res: any) => {
      if(res && res.Participants && res.Participants.length){
        this.participants = res.Participants

        this.participants.forEach((element:any) => {
          element.selected = false
          element.disabled = false
        });
        this.globalUsersService.getEventSpecificParticipantList(this.data.eventName).subscribe((res: any) => {
          console.log(res, this.data.eventName, "in ngInit in participant link")
          if(res && res.EventParticipants) {
            res.EventParticipants.forEach((element: any) => {
              this.participants.forEach((participant: any) => {
                if (participant.id == element.id){
                  participant.selected = true
                  participant.disabled = true
                }
              })
            })
          }
        })
      
      }



    })
    // console.log("data",this.data)
  }


  valueChange(name: any, event: any){
    console.log(name, event.checked)
    this.participants.forEach((element: any) => {
      if(element['name'] == name) element['selected'] = event.checked
    });
    console.log(this.participants)
  }

  setAll(event: any){
    this.allSelected = !this.allSelected
    this.participants.forEach((element: any) => {
      if (!element['disabled'])
        element['selected'] = this.allSelected
    });
    console.log(this.participants)
  }

  addSelectedParticipantsToEvent() {
    var localParticipantList: any = []
    this.participants.forEach((element: any) => {
      if (element.selected) localParticipantList.push(element.username)
    })
    console.log("localParticipantList", localParticipantList)
    this.eventsService.addParticipantsToEvent(this.data.eventName, localParticipantList).subscribe((res: any) => {
      this.globalUsersService.eventParticipantsFetchTrigger.next(0)
    },
    err => console.log("internal server error"))
    this.closeOverlay()
    
  }

  findWhetherAnySelected(){
    var returnVal: boolean = false
    this.participants.forEach((element: any) => {
      if(element.selected) {
        returnVal = true;
      }
    });
    
    return returnVal;
  }
  closeOverlay(){
    this.dialogRef.close()
  }


}
