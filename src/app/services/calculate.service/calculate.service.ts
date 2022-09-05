import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from 'src/app/backendUrl';
import { Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class CalculateService {


  getCalculatedData = new Subject()
  constructor(private http: HttpClient) {
   }

   calculate(eventName: string){
    return this.http.get(backendUrl + "/calculate/"+eventName)
   }
}
