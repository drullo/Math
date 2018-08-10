//#region Imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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
  //#endregion

  //#region Properties
  get config(): FlashCardConfig {
    return this.configService.config;
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
    this.scoreQuestion();
    this.currentQuestion++;
    answerInput.focus();
  }

  finish(): void {
    this.scoreQuestion();
    this.currentQuestion = -1;
    this.dialog.open(ScoreDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(() => this.router.navigate(['/flash-config']));
  }
  //#endregion

  //#region Utilities
  private scoreQuestion(recordScore = true): boolean {
    const question = this.configService.questions[this.currentQuestion];
    let toast = '';
    let correct = false;

    switch (question.operation) {
      case '+':
        correct = question.answer === question.operands[0] + question.operands[1];
        toast = `${question.operands[0]} + ${question.operands[1]} = ${question.answer}`;
        break;
      case '-':
        correct = question.answer === question.operands[0] - question.operands[1];
        toast = `${question.operands[0]} - ${question.operands[1]} = ${question.answer}`;
        break;
      case 'x':
        correct = question.answer === question.operands[0] * question.operands[1];
        toast = `${question.operands[0]} * ${question.operands[1]} = ${question.answer}`;
        break;
      case '/':
        correct = question.answer === question.operands[0] / question.operands[1];
        toast = `${question.operands[0]} ÷ ${question.operands[1]} = ${question.answer}`;
        break;
      case '²':
        correct = question.answer === Math.pow(question.operands[0], 2);
        toast = `${question.operands[0]}² = ${question.answer}`;
        break;
      case '³':
        correct = question.answer === Math.pow(question.operands[0], 3);
        toast = `${question.operands[0]}³ = ${question.answer}`;
        break;
      case '√':
        correct = question.answer === Math.sqrt(question.operands[0]);
        toast = `√${question.operands[0]} = ${question.answer}`;
        break;
      case '³√':
        correct = question.answer === Math.cbrt(question.operands[0]);
        toast = `√³${question.operands[0]} = ${question.answer}`;
        break;
    }

    if (recordScore) {
      question.correctAnswer = correct;

      if (this.config.toastMessages) {
        if (question.correctAnswer) {
          this.toastr.success(toast, 'Correct!', { positionClass: 'toast-top-left' });
        } else {
          this.toastr.error(toast, 'Incorrect', { positionClass: 'toast-top-right' });
        }
      }
    }

    return correct;
  }
  //#endregion
}
