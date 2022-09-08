import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from 'src/app/backendUrl';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(userName: string, password: string){
    return this.http.post(backendUrl+"/login", {"Username":userName, "Password":password})
  }

  registerUser(userName: string, password: string, name: string){
    return this.http.post(backendUrl+"/register", {"Username": userName, "Password": password, "Name": name})
  }
}
