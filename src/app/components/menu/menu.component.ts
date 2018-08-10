import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  user = localStorage.getItem('lastUserName');

  constructor(private router: Router) { }

  logout(): void {
    this.router.navigate(['/user-id']);
  }
}
