import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounce, debounceTime, tap } from 'rxjs';
import { GlobalUsersService } from 'src/app/services/global-users.service/global-users.service';

@Component({
  selector: 'app-filter-by-name',
  templateUrl: './filter-by-name.component.html',
  styleUrls: ['./filter-by-name.component.css']
})
export class FilterByNameComponent implements OnInit, AfterViewInit {


  filteredParticipants: Array<any> = []
  participants: Array<any> = []
  participantsForExclution: Array<any> = []
  searchFormGroup!: FormGroup
  
  constructor(private formBuilder: FormBuilder,
              private globalUsersService: GlobalUsersService) { }

  ngOnInit(): void {

    this.initForm()
  }

  ngAfterViewInit(): void {
    this.globalUsersService.triggerCurrentParticipantList.subscribe((res: any) => {
      this.participantsForExclution = res
    })
  }

  initForm() {
    this.searchFormGroup = this.formBuilder.group({
      'participantFormControl': ['']
    })
    this.searchFormGroup.get('participantFormControl')!.valueChanges
    .pipe(tap(res => {
      this.filteredParticipants = []
    }))
    .pipe(debounceTime(900))
    .subscribe((res: any) => {
      if(res && res.length > 0)
        this.filterData(res);
      else this.filteredParticipants = []
    })
  }

  filterData(enteredData: any) {
    this.participants = []
    this.globalUsersService.getParticipantNameByUserName(enteredData, "").subscribe((res: any) => {
      if (res && res.Participants){
        res.Participants.forEach((participant: any) => {
          if (!(this.participantsForExclution.find(participantForExclusion => participantForExclusion.username === participant.username )))
            this.participants.push(participant)
        })
        this.filteredParticipants = this.participants.filter(participant => {
          return participant.username.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
        })
      }
    })
    
  }

  sendParticipant(event: any){
    var target = event.target || event.srcElement || event.currentTarget;
    console.log(event.currentTarget.id, event.currentTarget.innerText.trim())
    this.globalUsersService.temporaryParticipantTrigger.next(
      { "id":event.currentTarget.id, "username": event.currentTarget.innerText.trim()}
    )
  }

}
