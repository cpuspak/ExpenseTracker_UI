import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalUsersService } from 'src/app/services/global-users.service/global-users.service';
import { TransactionsService } from 'src/app/services/transactions.service/transactions.service';
import { CalculateService } from 'src/app/services/calculate.service/calculate.service';
import { CommonBufferingService } from 'src/app/services/commonBuffering.service/common-buffering.service';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {

  participants: any = []
  allSelected: boolean = false;
  moneyFrom: string = ""
  amount: number = 0
  description: string = ""


  constructor(private globalUsersService: GlobalUsersService,
              private calculateService: CalculateService,
              @Inject(MAT_DIALOG_DATA) public data: {"eventName":""},
              private transactionsService: TransactionsService,
              public dialogRef: MatDialogRef<TransactionAddComponent>,
              public commonBufferingService: CommonBufferingService) { }

  ngOnInit(): void {

    console.log("event name from transaction add", this.data.eventName)
    
    this.globalUsersService.getEventSpecificParticipantList(this.data.eventName).subscribe((res: any) => {
      if(res && res.EventParticipants){
        this.participants = res.EventParticipants;
        this.participants.forEach((element: any) => {
          element["selected"] = false;
        });
      }
    },
    err => console.log("err getting data"))
  }

  allComplete: boolean = false;

  

  valueChange(name: any, event: any){
    this.participants.forEach((element: any) => {
      if(element['username'] == name) element['selected'] = event.checked
    });
  }

  setAll(event: any){
    this.allSelected = !this.allSelected
    this.participants.forEach((element: any) => {
      element['selected'] = this.allSelected
    });
  }

  getSelectedUsers(): Array<any> {
    var localUserList: any = []
    this.participants.forEach((element: any) => {
      if (element.selected) localUserList.push(element.username)
    })
    return localUserList

  }

  addTransaction() {

    var localUserList: any = this.getSelectedUsers()

    
    this.commonBufferingService.transactionBufferingSubject.next(true)
    this.transactionsService.addTransaction(this.data.eventName, this.moneyFrom, this.amount, localUserList).subscribe((res: any) => {
      this.transactionsService.triggerFetchTransaction.next(this.data.eventName)
    },
    err => console.log("err adding txn"))
    this.closeDialog()
  }

  closeDialog(){
    this.dialogRef.close()
  }

}
