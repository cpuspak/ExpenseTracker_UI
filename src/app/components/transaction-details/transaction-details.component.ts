import { Component, OnInit, Inject } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service/transactions.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionAddComponent } from '../transaction-add/transaction-add.component';
import { CalculateService } from 'src/app/services/calculate.service/calculate.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

  transactions: any = []
  toDotxns: any = []

  constructor(
              public dialog: MatDialog,
              private calculateService: CalculateService,
              private transactionsService: TransactionsService,
              @Inject(MAT_DIALOG_DATA) public data: {"eventName":""}
              ) { }

  ngOnInit(): void {
    this.calculate();
  }

  ngAfterViewInit() {
    this.transactionsService.fetchTransaction(this.data.eventName).subscribe((res: any) => {
      if (res && res.txns){
        this.transactions = res.txns
      }
    },
    err => "error fetching transactions")

    this.transactionsService.triggerFetchTransaction.subscribe((res: any) => {
      if (!res || res != this.data.eventName) {
        return
      }
      this.transactionsService.fetchTransaction(this.data.eventName).subscribe((transactions: any) => {
        if (transactions && transactions.txns)
          this.transactions = transactions.txns
      },
      err => console.log("error fetching transactions"))
    })

    this.calculateService.getCalculatedData.subscribe((calculatedData: any) => {
      if (calculatedData && calculatedData.transactionDetails) this.toDotxns = calculatedData.transactionDetails
    })

  }

  addTransaction() {
    const dialogRef = this.dialog.open(TransactionAddComponent,{
      "width": "90vw",
      data: {eventName: this.data.eventName}
    });
  }

  calculate() {
    this.calculateService.calculate(this.data.eventName).subscribe((res: any) => {
      this.calculateService.getCalculatedData.next(res)
    })
  }

}
