//#region Imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from '@services/config.service';
import { ScoreDialogComponent } from '@components/score-dialog/score-dialog.component';
import { FlashCardConfig } from '@model/flash-card-config';
//#endregion

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.scss']
})
export class FlashCardsComponent {
  //#region Fields
  currentQuestion = 0; // -1;
  questionStart = moment();
  //#endregion

  //#region Properties
  get config(): FlashCardConfig {
    return this.configService.config;
  }

  get questionText(): string {
    const question = this.configService.questions[this.currentQuestion];

    switch (question.operation) {
      case '+': return `${question.operands[0]} + ${question.operands[1]} = ${question.answer}`;
      case '-': return `${question.operands[0]} - ${question.operands[1]} = ${question.answer}`;
      case 'x': return `${question.operands[0]} * ${question.operands[1]} = ${question.answer}`;
      case '/': return `${question.operands[0]} ÷ ${question.operands[1]} = ${question.answer}`;
      case '²': return `${question.operands[0]}² = ${question.answer}`;
      case '³': return `${question.operands[0]}³ = ${question.answer}`;
      case '√': return `√${question.operands[0]} = ${question.answer}`;
      case '³√': return `√³${question.operands[0]} = ${question.answer}`;
    }
  }

  get invalidInput(): boolean {
    const currentAnswer = this.configService.questions[this.currentQuestion].answer;
    return currentAnswer === null || currentAnswer === undefined || +currentAnswer === NaN;
  }
  //#endregion

  //#region Lifecycle
  constructor(public configService: ConfigService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService) { }
  //#endregion

  //#region Events
  doAutoAdvance(answerInput): void {
    if (!this.config.autoAdvance) { return; }

    if (this.scoreQuestion(false)) {
      if (this.currentQuestion < this.configService.questions.length - 1) {
        this.nextQuestion(answerInput);
      } else {
        this.finish();
      }
    }
  }

  nextQuestion(answerInput): void {
    this.toastQuestionSeconds();
    this.scoreQuestion();
    this.currentQuestion++;
    answerInput.focus();
  }

  finish(): void {
    this.toastQuestionSeconds();
    this.scoreQuestion();
    this.currentQuestion = -1;
    this.dialog.open(ScoreDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(() => this.router.navigate(['/flash-config']));
  }
  //#endregion

  //#region Utilities
  private toastQuestionSeconds(): void {
    const questionEnd = moment();
    const seconds = questionEnd.diff(this.questionStart, 'seconds');
    this.toastr.info(`${seconds} seconds: ${this.questionText}`, null, { positionClass: 'toast-top-center' });
  }

  private scoreQuestion(recordScore = true): boolean {
    const question = this.configService.questions[this.currentQuestion];
    let correct = false;

    switch (question.operation) {
      case '+':
        correct = question.answer === question.operands[0] + question.operands[1];
        break;
      case '-':
        correct = question.answer === question.operands[0] - question.operands[1];
        break;
      case 'x':
        correct = question.answer === question.operands[0] * question.operands[1];
        break;
      case '/':
        correct = question.answer === question.operands[0] / question.operands[1];
        break;
      case '²':
        correct = question.answer === Math.pow(question.operands[0], 2);
        break;
      case '³':
        correct = question.answer === Math.pow(question.operands[0], 3);
        break;
      case '√':
        correct = question.answer === Math.sqrt(question.operands[0]);
        break;
      case '³√':
        correct = question.answer === Math.cbrt(question.operands[0]);
        break;
    }

    if (recordScore) {
      question.correctAnswer = correct;

      if (this.config.toastMessages) {
        if (question.correctAnswer) {
          this.toastr.success(this.questionText, 'Correct!', { positionClass: 'toast-top-left' });
        } else {
          this.toastr.error(this.questionText, 'Incorrect', { positionClass: 'toast-top-right' });
        }
      }
    }

    this.questionStart = moment();

    return correct;
  }
  //#endregion
}