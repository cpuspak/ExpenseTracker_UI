import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service/events.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventAddComponent } from '../event-add/event-add.component';
import { CalculateService } from 'src/app/services/calculate.service/calculate.service';
import { LoginService } from 'src/app/services/login.service/login.service';
import { CommonBufferingService } from 'src/app/services/commonBuffering.service/common-buffering.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {

  allEvents: any = []
  addEventBufferFlag: boolean = false
  constructor(private eventsService: EventsService,
    public dialog: MatDialog,
    private calculateService: CalculateService,
    private loginService: LoginService,
    private commonBufferingService: CommonBufferingService){}


  transactions: any = []
  ngOnInit():void {
    this.addEventBufferFlag = true
    this.eventsService.fetchAllEvents().subscribe((res: any) => {
      console.log(res, "events")
      if(res && res.Events && res.Events.length) {
        this.allEvents = res.Events.sort((a: any,b: any) => a.EventTime > b.EventTime);
        this.addEventBufferFlag = false
      }
    },
    err => console.log("error fetching events from api"))
  }

  ngAfterViewInit(): void {

    this.commonBufferingService.eventBufferingSubject.subscribe((res: any) => {
      this.addEventBufferFlag = true
    })
    this.eventsService.eventFetchTrigger.subscribe((res: any) => {
      this.eventsService.fetchAllEvents().subscribe((event: any) => {
        if (event && event.Events && event.Events.length)
        this.allEvents = event.Events
        this.addEventBufferFlag = false
      })
    })

    this.calculateService.getCalculatedData.subscribe((calculatedData: any) => {
      if (calculatedData && calculatedData.transactionDetails) this.transactions = calculatedData.transactionDetails
    })
  }

  addEventPopup(){
    // this.eventsService.sendAddEventRequest.next(0);
    const dialogRef = this.dialog.open(EventAddComponent,{
      // "width": "90vw"
    });
  }

  logoutUser(){
    this.loginService.logout()
    window.location.href = ""
  }

}

