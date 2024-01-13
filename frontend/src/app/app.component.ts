import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './state/user.state';
import { browserReload } from './state/login/login.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Master';

  constructor(private store: Store<UserState>){}
  
  ngOnInit(){
    let userData = window.localStorage.getItem('user-data') 
    const userToken = window.localStorage.getItem('user-token') 
    console.log();
    
    if(userData && userToken){
      userData = JSON.parse(userData);
      this.store.dispatch(browserReload({userToken,  userData}))
    }
  }
}
