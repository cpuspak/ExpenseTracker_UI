import { Component, OnInit } from '@angular/core';
import { GlobalUsersService } from 'src/app/services/global-users.service/global-users.service';


@Component({
  selector: 'app-global-participants',
  templateUrl: './global-participants.component.html',
  styleUrls: ['./global-participants.component.css']
})
export class GlobalParticipantsComponent implements OnInit {


  globalUsers: any = undefined;
  constructor(private globalUsersService: GlobalUsersService) { }

  ngOnInit(): void {
    this.globalUsersService.getGlobalListOfUsers().subscribe(
      (res: any) => {
        if (res && res.Participants && res.Participants.length){
          this.globalUsers = res.Participants
        }
      },
      err => console.log("error fetching data from api")
    )
  }




}
