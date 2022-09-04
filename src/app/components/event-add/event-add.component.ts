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
    console.log(this.eventName)
    this.eventsService.addEvent(this.eventName, "sample event description").subscribe((res: any) => {
      if (res){
        console.log(res)
        this.eventsService.eventFetchTrigger.next(0)
      }
    })
    this.closeOverlay()
  }

  closeOverlay(){
    this.dialogRef.close()
  }

}
