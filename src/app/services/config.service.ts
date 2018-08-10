import { User } from '@model/user';
import { Injectable } from '@angular/core';
import { Question } from '@model/question';
import { FlashCardConfig } from '@model/flash-card-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  questions: Question[] = [];

  private users: User[] = JSON.parse(localStorage.getItem('users'));
  private lastUserName = localStorage.getItem('lastUserName');

  private userIndex: number = this.lastUserName ?
    this.users.findIndex(u => u.name === this.lastUserName)
    : -1;

  config = this.userIndex > -1 ?
    this.users[this.userIndex].flashCardConfig :
    new FlashCardConfig();
}
