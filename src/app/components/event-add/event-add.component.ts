import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service/events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonBufferingService } from 'src/app/services/commonBuffering.service/common-buffering.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  eventName: string = ""
  
  constructor(private eventsService: EventsService,
              public dialogRef: MatDialogRef<EventAddComponent>,
              private commonBufferingService: CommonBufferingService) { }

  ngOnInit(): void {
  }

  addEvent(event: any){
    this.commonBufferingService.eventBufferingSubject.next(true)
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
