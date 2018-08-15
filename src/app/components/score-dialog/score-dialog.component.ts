//#region Imports
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { FlashCardsConfigService } from '@services/flash-cards-config.service';
import { User } from '@model/user';
import { Question } from '@model/question';
//#endregion

@Component({
  selector: 'app-score-dialog',
  templateUrl: './score-dialog.component.html',
  styleUrls: ['./score-dialog.component.scss']
})
export class ScoreDialogComponent implements OnInit {
  //#region Properties
  get correctCount(): number {
    return this.configService.questions.filter(q => q.correctAnswer).length;
  }

  get incorrectCount(): number {
    return this.configService.questions.filter(q => q.correctAnswer === false).length;
  }

  get percentageGrade(): number {
    return Math.round((this.correctCount / this.configService.questions.length) * 100);
  }

  get letterGrade(): string {
    if (this.percentageGrade === 100) { return 'A+'; }
    if (this.percentageGrade >= 90) { return 'A'; }
    if (this.percentageGrade >= 80) { return 'B'; }
    if (this.percentageGrade >= 70) { return 'C'; }
    if (this.percentageGrade >= 60) { return 'D'; }
    return 'F';
  }

  get courseSeconds(): number {
    const courseStart: moment.Moment = this.data.courseStart;
    const courseEnd: moment.Moment = this.data.courseEnd;
    return courseEnd.diff(courseStart, 'seconds');
  }

  get correctQuestionsByTime(): Question[] {
    return this.configService.questionsBySeconds
      .filter(q => q.correctAnswer);
  }

  get slowestQuestion(): Question {
    return this.correctQuestionsByTime ?
      this.correctQuestionsByTime[0] :
      null;
  }

  get fastestQuestion(): Question {
    return this.correctQuestionsByTime ?
      this.correctQuestionsByTime[this.correctQuestionsByTime.length - 1] :
      null;
  }
  //#endregion

  //#region Lifecycle
  constructor(public configService: FlashCardsConfigService,
    public dialog: MatDialogRef<ScoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

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
