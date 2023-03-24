import { Component, OnInit, Inject } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service/transactions.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionAddComponent } from '../transaction-add/transaction-add.component';
import { CalculateService } from 'src/app/services/calculate.service/calculate.service';
import { CommonBufferingService } from 'src/app/services/commonBuffering.service/common-buffering.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

  transactions: any = []
  toDotxns: any = []
  transactionBufferingFlag = false

  constructor(
              public dialog: MatDialog,
              private calculateService: CalculateService,
              private transactionsService: TransactionsService,
              @Inject(MAT_DIALOG_DATA) public data: {"eventName":""},
              private commonBufferingService: CommonBufferingService
              ) { }

  ngOnInit(): void {
    this.calculate();
  }

  ngAfterViewInit() {
    this.transactionBufferingFlag = true
    this.transactionsService.fetchTransaction(this.data.eventName).subscribe((res: any) => {
      if (res && res.txns){
        this.transactions = res.txns
        this.transactionBufferingFlag = false
      }
    },
    err => "error fetching transactions")

    this.transactionsService.triggerFetchTransaction.subscribe((res: any) => {
      if (!res || res != this.data.eventName) {
        return
      }
      this.transactionsService.fetchTransaction(this.data.eventName).subscribe((transactions: any) => {
        if (transactions && transactions.txns){
          this.transactions = transactions.txns
          this.calculate()
        }
          
      },
      err => console.log("error fetching transactions"))

      
    })

    this.calculateService.getCalculatedData.subscribe((calculatedData: any) => {
      if (calculatedData && calculatedData.transactionDetails) this.toDotxns = calculatedData.transactionDetails
      this.transactionBufferingFlag = false
    })

    this.commonBufferingService.transactionBufferingSubject.subscribe((res: any) => {
      this.transactionBufferingFlag = true
    })

    

    

  }

  addTransaction() {
    const dialogRef = this.dialog.open(TransactionAddComponent,{
      // "width": "90vw",
      data: {eventName: this.data.eventName}
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      console.log("dialog ref closed")
    })
  }

  calculate() {
    this.transactionBufferingFlag = true
    this.calculateService.calculate(this.data.eventName).subscribe((res: any) => {
      this.calculateService.getCalculatedData.next(res)
    })
  }

  deleteTransaction(event: any){
    this.transactionBufferingFlag = true
    var transactionId = Number(event.srcElement.id)
    this.transactionsService.deleteTransaction(transactionId).subscribe((res: any) => {
      if(res){
        this.transactionsService.triggerFetchTransaction.next(this.data.eventName)
      }
    },
    err => console.log("error in deleting transaction"))
  }

}
