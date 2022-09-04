import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from 'src/app/backendUrl';

@Injectable({
  providedIn: 'root'
})
export class GlobalUsersService {

  constructor(private http: HttpClient) { }


  getGlobalListOfUsers() {
    return this.http.get(backendUrl+"/fetch_participants");
  }

}
