import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { userAuthGuard } from './guards/user-auth.guard';
import { NotFoundErrorComponent } from './components/not-found-error/not-found-error.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'editProfile', component: EditProfileComponent}
    ],
    canActivate: [userAuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'serverError', component: InternalServerErrorComponent },
  { path: "**", component: NotFoundErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
