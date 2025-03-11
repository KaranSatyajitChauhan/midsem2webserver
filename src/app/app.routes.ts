import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ActivateComponent } from './components/activate/activate.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
export const routes: Routes = [
    {path:"",component:DashboardComponent},
    {path: 'login', component: LoginComponent,canActivate: [AuthGuard]},
    {path:'registration', component:RegistrationComponent,canActivate: [AuthGuard]},
    {path:'activate', component:ActivateComponent,canActivate: [AuthGuard]},
    {path:'account',component:AccountsComponent,canActivate: [AuthGuard]}
];
