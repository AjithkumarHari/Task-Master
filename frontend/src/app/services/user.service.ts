import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../types/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  server = environment.serverUrl;

  constructor(  private http: HttpClient ) { }

  addTask(task: Task){
    return this.http.post(`${this.server}/user/add-task`, task);
  }

  getTasksByUser(userId: string): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.server}/user/task-list/${userId}`)
  }
}
