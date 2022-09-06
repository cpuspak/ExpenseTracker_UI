import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service/events.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  eventName: string = ""
  
  constructor(private eventsService: EventsService,
              public dialogRef: MatDialogRef<EventAddComponent>,) { }

  ngOnInit(): void {
  }

  addEvent(event: any){
    this.eventsService.addEvent(this.eventName, "sample event description").subscribe((res: any) => {
      if (res){
        this.eventsService.eventFetchTrigger.next(this.eventName)
      }
    })
    this.closeOverlay()
  }

  closeOverlay(){
    this.dialogRef.close()
  }

}
