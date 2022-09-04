import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgModule } from '@angular/core'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ParticipantLinkComponentComponent } from '../participant-link-component/participant-link-component.component';
import { TransactionAddComponent } from '../transaction-add/transaction-add.component';
import { EventsService } from 'src/app/services/events.service/events.service';


@Component({
  selector: 'app-event-component',
  templateUrl: './event-component.component.html',
  styleUrls: ['./event-component.component.scss']
})
export class EventComponentComponent implements OnInit, AfterViewInit {

  panelOpenState: boolean = false;
  transactions: any = []
  eventName: string = "sampleTestEvent"

  participants: any = []

  constructor(public dialog: MatDialog,
              private eventsService: EventsService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.eventsService.sendAddEventRequest.subscribe((res: any) => {

    });
  }

  addTransaction() {
    const dialogRef = this.dialog.open(TransactionAddComponent,{
      "width": "90vw"
    });
  }

  addParticipantToEvent() {
    const dialogRef = this.dialog.open(ParticipantLinkComponentComponent,{
      "width": "90vw",
      data: {eventName: this.eventName}
    });
  }

}
