import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
