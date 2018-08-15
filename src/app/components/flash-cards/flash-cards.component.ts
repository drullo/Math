//#region Imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from '@services/config.service';
import { FlashCardConfig } from '@model/flash-card-config';
import { ScoreDialogComponent } from '@components/score-dialog/score-dialog.component';
import { ScoreDataDialogComponent } from '@components/score-data-dialog/score-data-dialog.component';
//#endregion

@Component({
  selector: 'app-flash-cards',
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.scss']
})
export class FlashCardsComponent implements OnInit, OnDestroy {
  //#region Fields
  currentQuestion = 0; // -1;
  courseStart = moment(); // overall start time
  questionStart = moment(); // start time of each question
  secondsSinceStart: number;
  secondsSinceStartSubscription: Subscription;
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

  ngOnInit(): void {
    this.calculateSecondsSinceStart();
  }

  ngOnDestroy(): void {
    this.killSubscription();
  }
  //#endregion

  //#region Events
  doAutoAdvance(answerInput, event = null): void {
    if (!this.config.autoAdvance && event.keyCode !== 13) { return; }

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
    this.killSubscription();
    this.currentQuestion = -1;
    this.dialog.open(ScoreDialogComponent, {
        disableClose: true,
        data: {
          courseStart: this.courseStart,
          courseEnd: moment()
        }
      }).afterClosed()
      .subscribe(result => {
        if (result) {
          this.dialog.open(ScoreDataDialogComponent, {
            disableClose: true,
            minWidth: '50vw'
          }).afterClosed()
            .subscribe(() => this.router.navigate(['/flash-config']));
        } else {
          this.router.navigate(['/flash-config']);
        }
      });
  }
  //#endregion

  //#region Utilities
  private toastQuestionSeconds(): void {
    // if (!this.config.toastTimes) { return; }

    const questionEnd = moment();
    const seconds = questionEnd.diff(this.questionStart, 'seconds');

    this.configService.questions[this.currentQuestion].description = this.questionText;
    this.configService.questions[this.currentQuestion].seconds = seconds;

    if (this.config.toastTimes) {
      this.toastr.info(`${seconds} seconds: ${this.questionText}`, null, { positionClass: 'toast-top-center' });
    }
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

  private calculateSecondsSinceStart(): void {
    if (!this.secondsSinceStartSubscription) {
      this.secondsSinceStartSubscription = timer(0, 1000)
        .subscribe(() => {
          const now = moment();
          this.secondsSinceStart = now.diff(this.questionStart, 'seconds');
        });
    }
  }

  private killSubscription(): void {
    if (this.secondsSinceStartSubscription) {
      this.secondsSinceStartSubscription.unsubscribe();
      this.secondsSinceStartSubscription = null;
    }
  }
  //#endregion
}
