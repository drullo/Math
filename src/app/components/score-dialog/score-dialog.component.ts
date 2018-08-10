//#region Imports
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { User } from '@model/user';
//#endregion

@Component({
  selector: 'app-score-dialog',
  templateUrl: './score-dialog.component.html',
  styleUrls: ['./score-dialog.component.scss']
})
export class ScoreDialogComponent implements OnInit {
  //#region Properties
  get correctCount(): number {
    return this.config.questions.filter(q => q.correctAnswer).length;
  }

  get incorrectCount(): number {
    return this.config.questions.filter(q => q.correctAnswer === false).length;
  }

  get percentageGrade(): number {
    return Math.round((this.correctCount / this.config.questions.length) * 100);
  }

  get letterGrade(): string {
    if (this.percentageGrade === 100) { return 'A+'; }
    if (this.percentageGrade >= 90) { return 'A'; }
    if (this.percentageGrade >= 80) { return 'B'; }
    if (this.percentageGrade >= 70) { return 'C'; }
    if (this.percentageGrade >= 60) { return 'D'; }
    return 'F';
  }
  //#endregion

  //#region Lifecycle
  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.saveResults();
  }
  //#endregion

  //#region Utilities
  private saveResults(): void {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.name === localStorage.getItem('lastUserName'));
    users[userIndex].lastLetterGrade = this.letterGrade;
    users[userIndex].lastPercentageGrade = this.percentageGrade;
    localStorage.setItem('users', JSON.stringify(users));
  }
  //#endregion
}
