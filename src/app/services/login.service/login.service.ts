import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from 'src/app/backendUrl';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  generateToken(userName: string, password: string){

    return this.http.post(backendUrl+"/login", {"Username":userName, "Password":password})
  }

  setLoginInfos(tokenJson: any){
    this.setSession(tokenJson.token, "3000")
  }

  registerUser(userName: string, password: string, name: string){
    return this.http.post(backendUrl+"/register", {"Username": userName, "Password": password, "Name": name})
  }

  setSession(token: string, expiry: string) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('expires_at', expiry)
  }        


  isLoggedIn() {
    try{
      // return moment().isBefore(this.getExpiration());
      return localStorage.getItem("id_token")
    } catch {
      return false;
    }
  }


  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at")
  }


  isLoggedOut() {
    return !this.isLoggedIn();
  }


  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if(expiration){
      var expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    else return moment(0)
    
  }  
}
