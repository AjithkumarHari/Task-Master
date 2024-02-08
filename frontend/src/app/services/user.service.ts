import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../types/Task';
import { Observable } from 'rxjs';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private server = environment.serverUrl;

  constructor(  private http: HttpClient ) { }

  addTask(task: Task){
    return this.http.post(`${this.server}/user/add-task`, task);
  }

  getTasksByUser(userId: string): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.server}/user/task-list/${userId}`)
  }

  updateTaskStatus(taskId: string){ 
    return this.http.put(`${this.server}/user/update-task`, {taskId})
  }
  
  editTaskContent(taskId: string, newContent: string){ 
    return this.http.put(`${this.server}/user/edit-task`, {taskId, newContent})
  }

  deleteTaskById(taskId: string){
    return this.http.delete(`${this.server}/user/delete-task/${taskId}`)
  }

  updateUserDetails(user: User){
    return this.http.put(`${this.server}/user/update-user`, { user})
  }
}
