import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onSelectionChange(event: any) {
    const selectedValue = event.target.value;

    if (selectedValue === 'logout') {
      this.router.navigate(['/login']);
    } else if (selectedValue === 'profile') {
      event.target.value = 'user'
      this.router.navigate(['/profile']);
    }
  }
}
