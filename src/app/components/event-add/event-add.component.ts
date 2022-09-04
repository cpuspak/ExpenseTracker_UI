import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service/events.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  eventName: string = ""

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
  }

  addEvent(event: any){
    console.log(this.eventName)
    this.eventsService.addEvent(this.eventName, "sample event description").subscribe((res: any) => {
      if (res){
        console.log(res)
      }
    } )
  }

}