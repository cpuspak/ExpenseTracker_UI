import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuardService } from './services/authGuard.service/auth-guard.service';
import { LoginAuthService } from './services/loginAuth.service/login-auth.service';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginAndRegisterComponent,
    canActivate: [LoginAuthService]
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
