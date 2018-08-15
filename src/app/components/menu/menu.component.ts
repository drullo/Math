import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashCardsConfigService } from '@services/flash-cards-config.service';
import { GridConfigService } from '@services/grid-config.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user = localStorage.getItem('lastUserName');

  constructor(private router: Router,
    private flashCardsConfigService: FlashCardsConfigService,
    private gridConfigService: GridConfigService) { }

  ngOnInit(): void {
    // If the user returned to the menu before completing the questions, then we should clear the questions
    this.flashCardsConfigService.questions = [];
    this.gridConfigService.columns = [];
    this.gridConfigService.rows = [];
  }

  logout(): void {
    this.router.navigate(['/user-id']);
  }
}
