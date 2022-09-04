import { Component, OnInit, Inject } from '@angular/core';
import { GlobalUsersService } from 'src/app/services/global-users.service/global-users.service';
import { EventsService } from 'src/app/services/events.service/events.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
            private eventsService: EventsService) { }

  ngOnInit(): void {
    this.globalUsersService.getGlobalListOfUsers().subscribe((res: any) => {
      if(res && res.Participants && res.Participants.length){
        this.participants = res.Participants

        this.participants.forEach((element:any) => {
          element.selected = false
        });
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
      element['selected'] = this.allSelected
    });
    console.log(this.participants)
  }

  addSelectedParticipantsToEvent() {
    var localParticipantList: any = []
    this.participants.forEach((element: any) => {
      if (element.selected) localParticipantList.push(element.username)
    })
    this.eventsService.addParticipantsToEvent(this.data.eventName, localParticipantList).subscribe((res: any) => {
      console.log(res)
    },
    err => console.log("internal server error"))
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


}
