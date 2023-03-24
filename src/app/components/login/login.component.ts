import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = ""
  password: string = ""
  message: string = ""
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }



  loginUser(){
    this.message = ""
    this.loginService.generateToken(this.userName, this.password).subscribe((res: any) => {
      if(res && res.token){
        try{
          this.loginService.setLoginInfos(res)
          this.message = ""
          window.location.href = ""
        } catch {
          this.message = "error!"
        }
      } else this.message = "error!"
    }, err => this.message = "error!")
    
  }
}
