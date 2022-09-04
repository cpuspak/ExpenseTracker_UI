import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {

  participants: any = []
  allSelected: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.participants = [
      {'name':'puspak', 'selected': false},
      {'name':'arkes', 'selected': false},
      {'name':'iqbal', 'selected': false},
    ]
  }

  allComplete: boolean = false;

  updateAllComplete() {
    console.log("clicked")
  }

  valueChange(name: any, event: any){
    console.log(name, event.checked)
    this.participants.forEach((element: any) => {
      if(element['name'] == name) element['selected'] = event.checked
    });
    console.log(this.participants)
  }

  setAll(event: any){
    this.allSelected = !this.allSelected
    this.participants.forEach((element: any) => {
      element['selected'] = this.allSelected
    });
    console.log(this.participants)
  }


}
