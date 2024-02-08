import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/types/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  currentPage: number = 1;
  pages: number[] = [];
  @Input() tasks!: Task[];
  @Input() count!: number;
  @Output() onDeleteTask : EventEmitter<string> = new EventEmitter<string>();
  @Output() onUpdateTask : EventEmitter<string> = new EventEmitter<string>();
  @Output() onEditTask : EventEmitter<Task> = new EventEmitter<Task>();

  ngOnChanges(changes: SimpleChanges){
    if (changes['count']) {
      const newCount = changes['count'].currentValue;
      this.countPages(newCount);
    }
  }

  countPages(total: number){   
    this.pages = []; 
    for(let i=1;i<=Math.ceil(total/6);i++){
      this.pages.push(i)
    }
  }

  onPrevious($event: Event) {
    $event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onNext($event: Event) {
    $event.preventDefault();
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
    }
  }

  onDelete(taskId: string | undefined){
    this.onDeleteTask.emit(taskId)
  }
  
  onUpdate(taskId: string | undefined){
    this.onUpdateTask.emit(taskId)
  }

  onEdit(task: Task){
    this.onEditTask.emit(task)
  }

}
