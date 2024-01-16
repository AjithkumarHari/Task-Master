import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { Task } from '../types/Task';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {

  @Input() date: any;
  @Input() month: any;
  @Input() year: any;
  @Input() tasks!: Task[];
  @Input() selectedDate!: Date;

  constructor(private el: ElementRef, private renderer: Renderer2, ) {
    this.updateSelectedClass();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date']) {
      this.updateSelectedClass();
    }
    if (changes['month']) {
      this.updateSelectedClass();
    }
    if (changes['year']) {
      this.updateSelectedClass();
    }
    if (changes['tasks']) {
      this.updateSelectedClass();
    }
    if (changes['selectedDate']) {
      this.updateSelectedClass();
    }

  }

  private updateSelectedClass() {

    const dateToCheck = new Date(this.year, this.month, this.date);
    dateToCheck.setHours(0, 0, 0, 0);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const selectedDateAsDate = new Date(this.selectedDate);
    selectedDateAsDate.setHours(0, 0, 0, 0);

    //check if date is past
    if (currentDate.getTime() > dateToCheck.getTime()) {
      this.renderer.addClass(this.el.nativeElement, 'text-gray-400');
      this.renderer.addClass(this.el.nativeElement, 'pointer-events-none');
      this.renderer.removeClass(this.el.nativeElement, 'bg-gray-800');
      this.renderer.removeClass(this.el.nativeElement, 'bg-gray-300');
      this.renderer.removeClass(this.el.nativeElement, 'text-white');
    }else{
      this.renderer.removeClass(this.el.nativeElement, 'text-gray-400');
      this.renderer.removeClass(this.el.nativeElement, 'pointer-events-none');

      //check  if date is today
      if (currentDate.getTime() == dateToCheck.getTime()) {
        this.renderer.addClass(this.el.nativeElement, 'bg-gray-300');
      }
      else{
        this.renderer.removeClass(this.el.nativeElement, 'bg-gray-300');
      }

      //select day
      if (selectedDateAsDate.getTime() == dateToCheck.getTime()) {
        this.renderer.addClass(this.el.nativeElement, 'text-white');
        this.renderer.addClass(this.el.nativeElement, 'bg-gray-800');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'text-white');
        this.renderer.removeClass(this.el.nativeElement, 'bg-gray-800');
      }

    }

 
  }

}
