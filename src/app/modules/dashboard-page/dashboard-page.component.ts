import { Component } from '@angular/core';
import { NgForOf, TitleCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { GlobalService } from '../../common/services/global.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NgForOf, RouterLink, RouterLinkActive, RouterOutlet, TitleCasePipe],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent {
  routes = ['exams', 'lessons', 'students'];

  constructor(public globalService: GlobalService) {}
}
