import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { UserState } from 'src/app/state/user.state';
import { Task } from 'src/app/types/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  newTask: string = '';
  @Input() date!: Date;
  @Input() userId!: string;
  @Output() onCancel : EventEmitter<Date> = new EventEmitter<Date>();

  constructor( private userService: UserService){}

  onClickCancel(){
    this.onCancel.emit()
  }

  onSubmitNewTask(){
   
    const task: Task = {
      userId: this.userId,
      content: this.newTask,
      date: this.date 
    } 
    console.log(task);
    this.userService.addTask(task).subscribe()
    this.onCancel.emit()
  }

}

