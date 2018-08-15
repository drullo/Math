import { User } from '@model/user';
import { Injectable } from '@angular/core';
import { Question } from '@model/question';
import { FlashCardConfig } from '@model/flash-card-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  questions: Question[] = [];

  get questionsBySeconds(): Question[] {
    return this.questions.sort((a, b) => {
      if (a.seconds < b.seconds) { return 1; }
      if (a.seconds > b.seconds) { return -1; }
      return 0;
    });
  }

  private users: User[] = JSON.parse(localStorage.getItem('users'));
  private lastUserName = localStorage.getItem('lastUserName');

  private userIndex: number = this.lastUserName ?
    this.users.findIndex(u => u.name === this.lastUserName)
    : -1;

  config = this.userIndex > -1 ?
    this.users[this.userIndex].flashCardConfig :
    new FlashCardConfig();
}
