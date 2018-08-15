import { Component } from '@angular/core';
import { GridConfigService } from '@services/grid-config.service';
import { GridConfig } from '@model/grid-config';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  //#region Fields
  /*minX = 0;
  maxX = 12;
  minY = 0;
  maxY = 12;
  x: number[] = [];
  y: number[] = [];
  operation = 'x';
  includeNegative = true;
  answerFields = true;*/
  //#endregion

  //#region Properties
  get blockWidth(): string {
    const blocks = this.config.columnMax - this.config.columnMin + 2;
    return `${window.innerWidth / blocks - 2}px`;
  }

  get blockHeight(): string {
    const blocks = this.config.rowMax - this.config.columnMin + 2;
    return `${window.innerHeight / blocks - 2}px`;
  }

  get config(): GridConfig {
    return this.configService.config;
  }

  constructor(public configService: GridConfigService) { }

  /*get totalX(): number {
    return this.maxX - this.minX + 1;
  }

  get totalY(): number {
    return this.maxY - this.minY + 1;
  }*/
  //#endregion

  /*populateGrid(): void {
    while (this.x.length < this.totalX) {
      this.x.push(this.getNext(this.x, this.minX, this.maxX));
    }

    while (this.y.length < this.totalY) {
      this.y.push(this.getNext(this.y, this.minY, this.maxY));
    }
  }*/

  /*private getNext(numArray: number[], min: number, max: number): number {
    const newNum = Math.round(Math.random() * (max - min)) + min;

    return numArray.find(n => n === newNum) === undefined ?
      newNum :
      this.getNext(numArray, min, max);
  }*/

  checkAnswer(row: number, col: number, answer: number): boolean {
    if (!answer) { return; }

    switch (this.config.operation) {
      case '+':
        return col + row === +answer;
      case '-':
        return col - row === +answer;
      case 'x':
        return col * row === +answer;
      case '/':
        return col / row === +answer;
    }
  }

  noGood(row: number, col: number): boolean {
    return (this.config.operation === '-' && !this.config.includeNegative && col - row < 0) ||
      (
        this.config.operation === '/' &&
        (
          row === 0 || col === 0 ||
          col / row !== Math.round(col / row)
        )
      );
  }
}
