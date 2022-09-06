import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
