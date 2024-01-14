import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  month!: number; 
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];
  selectedDate!: Date;

  @Input() tasks!: any[];
  @Output() onAddTask : EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDeleteTask : EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onShowTask : EventEmitter<Date> = new EventEmitter<Date>();

  constructor( ){}
  
  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.selectedDate = new Date(this.year, this.month, today.getDate())
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  trackByIdentity = (index: number, item: any) => item; 

  changeMonth(monthOffset: number) {
    this.month += monthOffset;
    if (this.month === -1) {
        this.month = 11; 
        this.year--; 
    } else if (this.month === 12) {
        this.month = 0; 
        this.year++;
    }
    this.getNoOfDays();
  }


  // isBooked(date: any) {
  //   const d = new Date(this.year, this.month, date);
  //   d.setHours(0, 0, 0, 0);
  //   const result = this.bookings.some((details) => {
  //     const newDate = new Date(details.bookingTime);
  //     newDate.setHours(0, 0, 0, 0);
  //     return newDate.getTime() === d.getTime();
  //   });
  //   return result;
  // }


  getDateValue(date: any): void {
    this.selectedDate = new Date(this.year, this.month, date);
    // if(this.isBooked(date)){
      this.onAddTask.emit(this.selectedDate)
    // }else{
      
    //   this.onBlockBooking.emit(this.selectedDate)
    // }
    
  }
}
