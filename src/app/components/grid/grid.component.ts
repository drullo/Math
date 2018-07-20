import { Component } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  minX = 0;
  maxX = 12;
  minY = 0;
  maxY = 12;
  x: number[] = [];
  y: number[] = [];
  operation = 'x';

  get blockWidth(): string {
    const blocks = this.maxX - this.minX + 2;
    return `${window.innerWidth / blocks - 2}px`;
  }

  get blockHeight(): string {
    const blocks = this.maxY - this.minY + 2;
    return `${window.innerHeight / blocks - 2}px`;
  }

  get totalX(): number {
    return this.maxX - this.minX + 1;
  }

  get totalY(): number {
    return this.maxY - this.minY + 1;
  }

  populateGrid(): void {
    while (this.x.length < this.totalX) {
      this.x.push(this.getNext(this.x, this.minX, this.maxX));
    }

    while (this.y.length < this.totalY) {
      this.y.push(this.getNext(this.y, this.minY, this.maxY));
    }
  }

  getNext(numArray: number[], min: number, max: number): number {
    const newNum = Math.round(Math.random() * (max - min)) + min;

    return numArray.find(n => n === newNum) === undefined ?
      newNum :
      this.getNext(numArray, min, max);
  }
}