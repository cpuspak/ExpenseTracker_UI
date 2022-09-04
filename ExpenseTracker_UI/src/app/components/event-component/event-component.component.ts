import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TransactionAddComponent } from '../transaction-add/transaction-add.component';

@Component({
  selector: 'app-event-component',
  templateUrl: './event-component.component.html',
  styleUrls: ['./event-component.component.scss']
})
export class EventComponentComponent implements OnInit {

  panelOpenState: boolean = false;
  transactions: any = []
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addTransaction() {
    const dialogRef = this.dialog.open(TransactionAddComponent);
    
  }

  addParticipant() {
    
  }

}
