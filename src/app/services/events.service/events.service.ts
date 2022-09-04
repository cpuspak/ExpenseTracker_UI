import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendUrl } from 'src/app/backendUrl';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  sendAddEventRequest = new Subject()
  eventFetchTrigger = new Subject()

  constructor(private http: HttpClient) {

  }

  addEvent(eventName: string, eventDescription: string) {
    return this.http.put(backendUrl+"/add_event",{"eventName":eventName, "eventDescription":eventDescription})
  }

  addParticipantsToEvent(eventName: string, participantList: any){
    return this.http.put(backendUrl+"/add_participant2event", {"eventName": eventName, "participantList": participantList})
  }

  fetchAllEvents(){
    return this.http.get(backendUrl+"/fetch_events")
  }


}
