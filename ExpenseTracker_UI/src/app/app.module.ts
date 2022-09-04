import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { EventComponentComponent } from './components/event-component/event-component.component';
import { MatExpansionModule } from '@angular/material/expansion'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { CdkAccordionModule } from "@angular/cdk/accordion"
import { MatIconModule } from "@angular/material/icon";
import { TransactionComponent } from './components/transaction/transaction.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { TransactionAddComponent } from './components/transaction-add/transaction-add.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    AllEventsComponent,
    EventComponentComponent,
    TransactionComponent,
    ParticipantComponent,
    TransactionAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    CdkAccordionModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
