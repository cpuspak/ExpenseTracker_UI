import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from 'src/app/backendUrl';
import { Subject } from 'rxjs';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  triggerFetchTransaction = new Subject()

  constructor(private http: HttpClient) { }



  addTransaction (eventName: string, paidByUserName: string, amount: number, sharedByUserNames: any) {
    
    return this.http.put(backendUrl+"/add_txns", {
      "eventName": eventName, "paidByUserName": paidByUserName, "Amount": amount, "sharedByUserNames" : sharedByUserNames
    })
  }

  fetchTransaction (eventName: string){
    return this.http.get(backendUrl + "/fetch_txns/"+eventName)
  }

  deleteTransaction(transactionId: number){
    // let req = new HttpRequest('DELETE', backendUrl + "/delete_txns");
    // let newReq = req.clone({body: [10]});
    return this.http.delete(backendUrl + "/delete_txns", {body:{"TxnID": transactionId}})
  }

}
