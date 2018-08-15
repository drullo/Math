import { Injectable } from '@angular/core';
import { User } from '@model/user';
import { Question } from '@model/question';
import { GridConfig } from '@model/grid-config';

@Injectable({
  providedIn: 'root'
})
export class GridConfigService {
  columns: number[] = [];
  rows: number[] = [];

  private users: User[] = JSON.parse(localStorage.getItem('users'));
  private lastUserName = localStorage.getItem('lastUserName');

  private userIndex: number = this.lastUserName ?
    this.users.findIndex(u => u.name === this.lastUserName)
    : -1;

  config = this.userIndex > -1 ?
    this.users[this.userIndex].gridConfig :
    new GridConfig();

  get totalColumns(): number {
    return this.config.columnMax - this.config.columnMin + 1;
  }

  get totalRows(): number {
    return this.config.rowMax - this.config.rowMin + 1;
  }
}
