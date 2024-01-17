import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  @Input() user!: User;
  @Output() onChangeTab : EventEmitter<string> = new EventEmitter<string>();

  onSelectHome(){
    this.onChangeTab.emit('home')
  }
}
