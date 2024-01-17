import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Task } from 'src/app/types/Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  newTask: string = '';
  @Input() task!: Task;
  @Output() onCancel : EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onCreated : EventEmitter<string> = new EventEmitter<string>();

  constructor( private userService: UserService){}

  ngOnChanges(changes: SimpleChanges){
    if (changes['task']) {
      const newCount = changes['task'].currentValue;
      this.newTask = newCount.content
    }
  }

  onClickCancel(){
    this.onCancel.emit()
  }

  onSubmitNewTask(){
    if(this.task._id){
      const task: Task ={
        userId: this.task._id,
        date: this.task.date,
        content: this.newTask,
      }
      this.userService.editTaskContent(this.task._id, this.newTask).pipe(take(1)).subscribe(()=>this.onCreated.emit());
    }
  }
}
