import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() userName!: string; 
  @Input() tab!: string;
  @Output() onChangeTab : EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router,
    private authService: AuthService,
  ) {}

  onSelectionChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'logout') {
      this.authService.deleteToken();
      this.router.navigate(['/login']);
    } else if (selectedValue === 'profile') {
      event.target.value = 'user'
      this.onChangeTab.emit('profile')
    }
  }

  onSelectHome(){
    this.onChangeTab.emit('home')
  }
}
