import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { NgModule } from '@angular/core'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ParticipantLinkComponentComponent } from '../participant-link-component/participant-link-component.component';
import { TransactionAddComponent } from '../transaction-add/transaction-add.component';
import { EventsService } from 'src/app/services/events.service/events.service';
import { GlobalUsersService } from 'src/app/services/global-users.service/global-users.service';
import { CalculateService } from 'src/app/services/calculate.service/calculate.service';
import { TransactionsService } from 'src/app/services/transactions.service/transactions.service';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';

@Component({
  selector: 'app-event-component',
  templateUrl: './event-component.component.html',
  styleUrls: ['./event-component.component.scss']
})
export class EventComponentComponent implements OnInit, AfterViewInit {
  @Input() eventName = ""
  @Input() eventId = 0

  panelOpenState: boolean = false;
  transactions: any = []

  participants: any = []

  constructor(public dialog: MatDialog,
              private eventsService: EventsService,
              private globalUsersService: GlobalUsersService,
              private calculateService: CalculateService,
              private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.globalUsersService.getEventSpecificParticipantList(this.eventName).subscribe((res: any) => {
      if (res && res.EventParticipants) this.participants = res.EventParticipants
    },
    err => console.log("error fetching participant specific to event for event", this.eventName))

    this.globalUsersService.eventParticipantsFetchTrigger.subscribe((res: any) => {
      if (!res || res != this.eventName) {
        return
      }
      this.globalUsersService.getEventSpecificParticipantList(this.eventName).subscribe((res: any) => {
        if (res && res.EventParticipants) this.participants = res.EventParticipants
      },
      err => console.log("error fetching participant specific to event for event", this.eventName))
    })

    this.transactionsService.fetchTransaction(this.eventName).subscribe((res: any) => {
      if (res && res.txns){
        this.transactions = res.txns
      }
    },
    err => "error fetching transactions")

    this.transactionsService.triggerFetchTransaction.subscribe((res: any) => {
      if (!res || res != this.eventName) {
        return
      }
      this.transactionsService.fetchTransaction(this.eventName).subscribe((transactions: any) => {
        if (transactions && transactions.txns)
          this.transactions = transactions.txns
      },
      err => console.log("error fetching transactions"))
    })
  }

  transactionDetails() {
    const dialogRef = this.dialog.open(TransactionDetailsComponent ,{
      "width": "90vw",
      data: {eventName: this.eventName}
    });
  }

  addTransaction() {
    const dialogRef = this.dialog.open(TransactionAddComponent,{
      "width": "90vw",
      data: {eventName: this.eventName}
    });
  }

  addParticipantToEvent() {
    const dialogRef = this.dialog.open(ParticipantLinkComponentComponent,{
      "width": "90vw",
      data: {eventName: this.eventName}
    });
  }

  calculate() {
    this.calculateService.calculate(this.eventName).subscribe((res: any) => {
      this.calculateService.getCalculatedData.next(res)
    })
  }

}
