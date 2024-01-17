import { Component, EventEmitter, Input, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Task } from 'src/app/types/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  newTask: string = '';
  @Input() date!: Date;
  @Input() userId!: string | undefined;
  @Output() onCancel : EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onCreated : EventEmitter<string> = new EventEmitter<string>();

  constructor( private userService: UserService){}

  onClickCancel(){
    this.onCancel.emit()
  }

  onSubmitNewTask(){
    if(this.userId){
    const task: Task = {
      userId: this.userId,
      content: this.newTask,
      date: this.date 
    } 
    this.userService.addTask(task).pipe(take(1)).subscribe(()=>this.onCreated.emit());
  }
  }

}

