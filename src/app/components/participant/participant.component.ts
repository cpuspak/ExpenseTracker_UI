import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  @Input() participantName = ""
  @Input() participantId = ""
  constructor() { }

  ngOnInit(): void {
  }

}
