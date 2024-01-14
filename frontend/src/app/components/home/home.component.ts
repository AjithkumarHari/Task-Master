import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { selectUserData } from 'src/app/state/login/login.selector';
import { UserState } from 'src/app/state/user.state';
import { Task } from 'src/app/types/Task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  show: boolean = false;
  add: boolean = false;
  delete: boolean = false;
  newTask: string = '';
  userId: any
  

  date : any
  tasks: Task[] = [];

  constructor( private userService: UserService,  private store: Store<UserState>,){}

  ngOnInit(): void {
    this.store.pipe(select(selectUserData)).pipe(take(1)).subscribe((data) => {
       this.userId = data._id
    });
    this.userService.getTasksByUser(this.userId).subscribe((data: Task[])=>{this.tasks = data
    })

  }
  cancel(){
    this.show = false;
    this.add = false;
    this.delete = false;
  }

  showTask(date: Date){
    // const data = this.bookings$.filter((details) => {
    //   const bookingDate = new Date(details.bookingTime);
    //   return bookingDate.toDateString() === date.toDateString();
    // });
    // this.selectedShowDay = data[0];
    this.show = true;
    this.add = false;
    this.delete = false;
  }
  addTask(date: Date){
    this.date = date
    // const workerId = this.workerId;
    // this.store.dispatch(workerBlockBooking({workerId,blockDate}));
    this.show  = false;
    this.add = true;
    this.delete  = false;
  }
  
  deleteTask(blockDate: Date){
    // const workerId = this.workerId;
    // this.store.dispatch(workerUnBlockBooking({workerId,blockDate}));

    this.show  = false;
    this.add = false;
    this.delete  = true;
  }

  onSubmitNewTask(){
   
    const task: Task = {
      userId: this.userId,
      content: this.newTask,
      date: this.date 
    } 
    console.log(task);
    this.userService.addTask(task).subscribe()
    this.newTask = "";  
     
  }
}
