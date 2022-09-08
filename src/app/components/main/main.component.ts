import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service/events.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventAddComponent } from '../event-add/event-add.component';
import { CalculateService } from 'src/app/services/calculate.service/calculate.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {

  allEvents: any = []
  constructor(private eventsService: EventsService,
    public dialog: MatDialog,
    private calculateService: CalculateService){}


  transactions: any = []
  ngOnInit():void {
    this.eventsService.fetchAllEvents().subscribe((res: any) => {
      if(res && res.Events && res.Events.length) this.allEvents = res.Events;
    },
    err => console.log("error fetching events from api"))
  }

  ngAfterViewInit(): void {
    this.eventsService.eventFetchTrigger.subscribe((res: any) => {
      this.eventsService.fetchAllEvents().subscribe((event: any) => {
        if (event && event.Events && event.Events.length)
        this.allEvents = event.Events
      })
    })

    this.calculateService.getCalculatedData.subscribe((calculatedData: any) => {
      if (calculatedData && calculatedData.transactionDetails) this.transactions = calculatedData.transactionDetails
    })
  }

  addEventPopup(){
    // this.eventsService.sendAddEventRequest.next(0);
    const dialogRef = this.dialog.open(EventAddComponent,{
      "width": "90vw"
    });
  }

}

