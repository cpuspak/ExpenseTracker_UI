import { Component } from '@angular/core';
import { EventsService } from './services/events.service/events.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventAddComponent } from './components/event-add/event-add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'expense-tracker-ui';
  constructor(private eventsService: EventsService,
              public dialog: MatDialog){

  }



  ngOnInit():void {

  }

  addEventPopup(){
    // this.eventsService.sendAddEventRequest.next(0);
    const dialogRef = this.dialog.open(EventAddComponent,{
      "width": "90vw"
    });
  }

}
