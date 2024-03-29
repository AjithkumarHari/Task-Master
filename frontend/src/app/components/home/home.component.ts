import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { selectUserData } from 'src/app/state/user.selector';
import { UserState } from 'src/app/state/user.state';
import { Task } from 'src/app/types/Task';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  add: boolean = false;
  edit: boolean = false;
  taskForEdit!: Task;
  user!: User;
  date!: Date;
  tasks: Task[] = [];
  tab:string = 'home';

  constructor( private userService: UserService,  private store: Store<UserState> ){}

  ngOnInit(): void {
    this.store.pipe(select(selectUserData)).pipe(take(1)).subscribe((data) => this.user = data );
    this.getTasks();
  }
  
  getTasks(){
    if(this.user._id)
    this.userService.getTasksByUser(this.user._id).pipe(take(1)).subscribe((data: Task[])=>this.tasks = data);
  }

  cancelAddBox(){
    this.add = false;
  }
  cancelEditBox(){
    this.edit = false;
  }

  afterAddTask(){
    this.getTasks();
    this.cancelAddBox();
  }

  afterEditTask(){
    this.getTasks();
    this.cancelEditBox();
  }

  addTask(date: Date){
    this.date = date;
    this.add = true;
  }
  
  deleteTask(taskId: string){
    this.userService.deleteTaskById(taskId).pipe(take(1)).subscribe(()=>this.getTasks());
  }

  updateTask(taskId: string){
    this.userService.updateTaskStatus(taskId).pipe(take(1)).subscribe(()=>this.getTasks());
  }

  editTask(task: Task){
    this.taskForEdit = task;
    this.edit = true;
  }

  changeTab(newTab: string){
    this.tab = newTab;
  }

}
