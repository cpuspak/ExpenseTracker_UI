import { Component, Input, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service/transactions.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  @Input() amount: number = 0
  @Input() transactionId: number = 0
  @Input() transactionTime: string = ""
  @Input() paidByUserName: string = ""
  @Input() sharedByUserNames: Array<string> = []
  @Input() eventName: string =""

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
  }

  deleteTransaction(){
    this.transactionsService.deleteTransaction(this.transactionId).subscribe((res: any) => {
      if(res){
        this.transactionsService.triggerFetchTransaction.next(this.eventName)
      }
    },
    err => console.log("error deleting transaction"))
  }

}
