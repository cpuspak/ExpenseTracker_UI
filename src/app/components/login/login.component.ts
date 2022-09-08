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
    this.loginService.loginUser(this.userName, this.password).subscribe((res: any) => {
      console.log(res)
    },
    err => {
      console.log("error loging in user")
      this.message = "Error!"
    })
  }
}
