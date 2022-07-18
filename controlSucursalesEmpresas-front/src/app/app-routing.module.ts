import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/admin/users/users.component';
import { ControlPanelComponent } from './components/company/control-panel/control-panel.component';
import { MyProfileComponent } from './components/company/my-profile/my-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'myProfile', component: MyProfileComponent },
  { path: 'controlPanel', component: ControlPanelComponent },
  { path: 'admin/users', canActivate: [UserGuard], component: UsersComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
