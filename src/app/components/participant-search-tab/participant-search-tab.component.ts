import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-participant-search-tab',
  templateUrl: './participant-search-tab.component.html',
  styleUrls: ['./participant-search-tab.component.css']
})
export class ParticipantSearchTabComponent implements OnInit {

  @Input() participantName: string = "";
  constructor() { }

  ngOnInit(): void {
  }


}
