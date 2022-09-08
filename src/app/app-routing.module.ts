import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginAndRegisterComponent
  },
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
