import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ConfigService } from '@services/config.service';
import { Question } from '@model/question';

@Component({
  selector: 'app-score-data-dialog',
  templateUrl: './score-data-dialog.component.html',
  styleUrls: ['./score-data-dialog.component.scss']
})
export class ScoreDataDialogComponent implements OnInit {
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChildren(MatSort) sort: QueryList<MatSort>;

  displayedColumns = ['description', 'operation', 'seconds'];

  get correctAnswers(): MatTableDataSource<Question> {
    const ds = new MatTableDataSource(
      this.configService.questionsBySeconds
        .filter(q => q.correctAnswer)
    );

    ds.sort = this.sort.first;

    return ds;
  }

  get inCorrectAnswers(): MatTableDataSource<Question> {
    const ds = new MatTableDataSource(
      this.configService.questionsBySeconds
        .filter(q => !q.correctAnswer)
    );

    ds.sort = this.sort.last;

    return ds;
  }

  constructor(private configService: ConfigService) { }

  ngOnInit() {
  }

  caption(column: string): string {
    switch (column) {
      case 'description': return 'Question';
      case 'seconds': return 'Time';
      case 'operation': return 'Operation';
    }
  }

  operation(operation: string): string {
    switch (operation) {
      case '+': return 'Addition';
      case '-': return 'Subtraction';
      case 'x': return 'Multiplication';
      case '/': return 'Division';
      case '²': return 'Square';
      case '³': return 'Cube';
      case '√': return 'Square Root';
      case '³√': return 'Cube Root';
    }
  }
}
