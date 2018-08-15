//#region Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@model/user';
import { FlashCardConfig } from '@model/flash-card-config';
import { GridConfig } from '@model/grid-config';
//#endregion

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.scss']
})
export class UserIdComponent implements OnInit {
  //#region Fields
  users: User[] = JSON.parse(localStorage.getItem('users'));
  newUser: User = { name: '', flashCardConfig: new FlashCardConfig(), gridConfig: new GridConfig() };
  selectedUser = this.lastUser;
  userName: string;
  //#endregion

  //#region Properties
  get isNewUser(): boolean {
    return this.selectedUser === this.newUser;
  }

  get lastUser(): User {
    if (!this.users) { return this.newUser; }

    const lastUserName = localStorage.getItem('lastUserName');
    const user = this.users.find(u => u.name === lastUserName);

    return user ? user : this.newUser;
  }
  //#endregion

  //#region Lifecycle
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!this.users) {
      this.users = [];
    }
  }
  //#endregion

  //#region Events
  begin(): void {
    if (this.isNewUser) {
      this.users.push(this.selectedUser);
      localStorage.setItem('users', JSON.stringify(this.users));
    }

    localStorage.setItem('lastUserName', this.selectedUser.name);

    this.router.navigate(['/menu']);
  }
  //#endregion
}
