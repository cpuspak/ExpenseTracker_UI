import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonBufferingService {


  transactionBufferingSubject = new Subject()
  eventBufferingSubject = new Subject()
  constructor() { }
}
