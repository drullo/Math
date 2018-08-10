//#region Imports
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@services/config.service';
import { FlashCardConfig } from '@model/flash-card-config';
import { Question } from '@model/question';
import { User } from '@model/user';
//#endregion

@Component({
  selector: 'app-flash-cards-config',
  templateUrl: './flash-cards-config.component.html',
  styleUrls: ['./flash-cards-config.component.scss']
})
export class FlashCardsConfigComponent implements OnInit {
  //#region Properties
  get config(): FlashCardConfig {
    return this.configService.config;
  }
  //#endregion

  //#region Lifecycle
  constructor(public configService: ConfigService, private router: Router) { }

  ngOnInit() {
  }
  //#endregion

  //#region Events
  operationsChanged(): void {
    // Make sure that number of questions isn't less than the number of operations
    if (this.config.operations.length > this.config.numOfQuestions) {
      this.config.numOfQuestions = this.config.operations.length;
    }
  }

  start(): void {
    // this.primeTest();

    // (Re)Initialize the list of questions
    this.configService.questions = [];

    let operationIndex = 0;

    // Populate the list of questions
    while (this.configService.questions.length < this.config.numOfQuestions) {
      // Initialize the question
      const question: Question = {
        operation: this.config.operations[operationIndex],
        operands: [], // These will get populated in the switch statement below
        answer: null,
        correctAnswer: null
      };

      // Get the appropriate operands for this question, based on the operation
      switch (question.operation) {
        case '+':
          question.operands.push(this.getRandomNum());
          question.operands.push(this.getRandomNum());
          break;
        case '-':
          question.operands.push(this.getRandomNum());
          if (this.config.includeNegative) {
            question.operands.push(this.getRandomNum());
          } else {
            question.operands.push(this.getRandomNum(this.config.min, question.operands[0]));
          }
          break;
        case 'x':
          question.operands.push(this.getRandomNum());
          question.operands.push(this.getRandomNum());
          break;
        case '/':
          question.operands.push(this.getRandomNum(this.config.min, this.config.max, true));
          question.operands.push(this.getRandomFactor(question.operands[0]));
          break;
        case '²':
          question.operands.push(this.getRandomNum());
          break;
        case '³':
          question.operands.push(this.getRandomNum());
          break;
        case '√':
          break;
        case '³√':
          break;
      }

      // Add the question to the list
      this.configService.questions.push(question);

      // Increment the operation Index
      operationIndex = operationIndex < this.config.operations.length - 1 ?
        operationIndex + 1 :
        0; // set it back to zero to loop through the operations again until all questions are populated
    }

    // Save the config for next time
    this.saveConfig();

    // Done populating questions, navigate to the FlashCardsComponent
    this.router.navigate(['/flash']);
  }

  menu(): void {
    this.router.navigate(['/menu']);
  }
  //#endregion

  //#region Utilities
  /*private primeTest(): void {
    for (let n = this.config.min; n <= this.config.max; n++) {
      console.log(`${n} ${this.getFactors(n).length < 3}`);
    }
  }*/

  private getFactors(dividend: number): number[] {
    // https://stackoverflow.com/questions/22130043/trying-to-find-factors-of-a-number-in-js
    const f = number => Array
      .from(Array(number + 1), (_, i) => i)
      .filter(i => number % i === 0);

    return f(dividend);
  }

  private getRandomFactor(dividend: number): number {
    const factors = this.getFactors(dividend);

    const divisorIndex = this.getRandomNum(0, factors.length - 1);
    return factors[divisorIndex];
  }

  private getRandomNum(min = this.config.min, max = this.config.max, disAllowZero = false): number {
    const rnd = Math.floor(Math.random() * (max - min + 1)) + min;

    return !disAllowZero || rnd !== 0 ?
      rnd :
      this.getRandomNum(min, max, disAllowZero);
  }

  private saveConfig(): void {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.name === localStorage.getItem('lastUserName'));

    users[userIndex].flashCardConfig = this.config;
    localStorage.setItem('users', JSON.stringify(users));
  }
  //#endregion
}
