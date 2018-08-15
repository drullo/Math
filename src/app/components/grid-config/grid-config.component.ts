import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridConfig } from '@model/grid-config';
import { GridConfigService } from '@services/grid-config.service';
import { Question } from '@model/question';
import { User } from '@model/user';

@Component({
  selector: 'app-grid-config',
  templateUrl: './grid-config.component.html',
  styleUrls: ['./grid-config.component.scss']
})
export class GridConfigComponent implements OnInit {
  //#region Properties
  get config(): GridConfig {
    return this.configService.config;
  }
  //#endregion

  //#region Lifecycle
  constructor(public configService: GridConfigService, private router: Router) { }

  ngOnInit() {
  }
  //#endregion

  //#region Events
  start(): void {
    // (Re)Initialize the list of questions
    this.configService.columns = [];
    this.configService.rows = [];

    while (this.configService.columns.length < this.configService.totalColumns) {
      this.configService.columns.push(this.getNext(this.configService.columns, this.config.columnMin, this.config.columnMax));
    }

    while (this.configService.rows.length < this.configService.totalRows) {
      this.configService.rows.push(this.getNext(this.configService.rows, this.config.rowMin, this.config.rowMax));
    }

    // Save the config for next time
    this.saveConfig();

    // Done populating questions, navigate to the GridComponent
    this.router.navigate(['/grid']);
  }

  menu(): void {
    this.router.navigate(['/menu']);
  }
  //#endregion

  //#region Utilities
  /*private getFactors(dividend: number): number[] {
    // https://stackoverflow.com/questions/22130043/trying-to-find-factors-of-a-number-in-js
    const f = number => Array
      .from(Array(number + 1), (_, i) => i)
      .filter(i => number % i === 0);

    return f(dividend);
  }*/

  /*private getRandomFactor(dividend: number): number {
    const factors = this.getFactors(dividend);

    const divisorIndex = this.getRandomNum(0, factors.length - 1);
    return factors[divisorIndex];
  }

  private getRandomNum(min = this.config.min, max = this.config.max, disAllowZero = false): number {
    const rnd = Math.floor(Math.random() * (max - min + 1)) + min;

    return !disAllowZero || rnd !== 0 ?
      rnd :
      this.getRandomNum(min, max, disAllowZero);
  }*/

  private getNext(numArray: number[], min: number, max: number): number {
    const newNum = Math.round(Math.random() * (max - min)) + min;

    return numArray.find(n => n === newNum) === undefined ?
      newNum :
      this.getNext(numArray, min, max);
  }

  private saveConfig(): void {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.name === localStorage.getItem('lastUserName'));

    users[userIndex].gridConfig = this.config;
    localStorage.setItem('users', JSON.stringify(users));
  }
  //#endregion
}
