import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../types/User';
import { Credentials } from '../types/Credentials';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server = environment.serverUrl;

  constructor(  private http: HttpClient ) { }

  signup(user: User){
    return this.http.post(`${this.server}/auth/user-signup`, user);
  }

  login(credentials: Credentials){
    return this.http.post(`${this.server}/auth/user-login`,credentials);
  }

  setToken(token: string){
    return window.localStorage.setItem('user-token',token);
  }

  getToken(){
    return window.localStorage.getItem('user-token');
  }
  
  deleteToken(){
    window.localStorage.removeItem('user-token');
    window.localStorage.removeItem('user-data');
  }
}
