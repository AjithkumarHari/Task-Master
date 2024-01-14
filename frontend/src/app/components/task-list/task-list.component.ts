import { Component, Input } from '@angular/core';
import { Task } from 'src/app/types/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks!: Task[];
}
