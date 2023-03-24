import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventsService } from './services/events.service/events.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventAddComponent } from './components/event-add/event-add.component';
import { CalculateService } from './services/calculate.service/calculate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'expense-tracker-ui';
  constructor(){

  }


}