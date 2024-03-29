import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { NotFoundErrorComponent } from './components/not-found-error/not-found-error.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

import { authReducer } from './state/user.reducer';
import { AuthEffects } from './state/user.effects';
import { DateDirective } from './directives/date.directive';
import { DateStringPipe } from './pipes/date-string.pipe';
import { GlobalErrorHanlderService } from './services/global-error-hanlder.service';
import { UserAuthInterceptor } from './interceptors/user-auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    ProfileComponent,
    CalendarComponent,
    DateDirective,
    DateStringPipe,
    AddTaskComponent,
    TaskListComponent,
    NotFoundErrorComponent,
    InternalServerErrorComponent,
    EditTaskComponent,
    EditProfileComponent,
  ],
  imports: [
    HttpClientModule ,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({ user : authReducer }),
    EffectsModule.forRoot(AuthEffects)
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHanlderService },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : UserAuthInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
