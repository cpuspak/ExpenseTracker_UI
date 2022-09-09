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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FormsModule } from '@angular/forms';
import { ParticipantLinkComponentComponent } from './components/participant-link-component/participant-link-component.component';
import { GlobalParticipantsComponent } from './components/global-participants/global-participants.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EventAddComponent } from './components/event-add/event-add.component';
import { MatTabsModule } from '@angular/material/tabs'
import { MatCardModule } from '@angular/material/card';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';
import { AuthInterceptorService } from './services/authInterceptor.service/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    AllEventsComponent,
    EventComponentComponent,
    TransactionComponent,
    ParticipantComponent,
    TransactionAddComponent,
    ParticipantLinkComponentComponent,
    GlobalParticipantsComponent,
    EventAddComponent,
    TransactionDetailsComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    LoginAndRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    CdkAccordionModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
