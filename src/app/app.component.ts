import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventsService } from './services/events.service/events.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventAddComponent } from './components/event-add/event-add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  allEvents: any = []

  title = 'expense-tracker-ui';
  constructor(private eventsService: EventsService,
              public dialog: MatDialog){

  }



  ngOnInit():void {
    this.eventsService.fetchAllEvents().subscribe((res: any) => {
      if(res && res.Events && res.Events.length) this.allEvents = res.Events;
      console.log(this.allEvents)
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
  }

  addEventPopup(){
    // this.eventsService.sendAddEventRequest.next(0);
    const dialogRef = this.dialog.open(EventAddComponent,{
      "width": "90vw"
    });
  }

}
