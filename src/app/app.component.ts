import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { environment } from '../environments/environment';

import { GlobalService } from './common/services/global.service';

import { LoadingComponent } from './common/components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    console.log('### ENVIRONMENT TYPE IS: ' + environment.environmentName);
    console.log('### BASE URL IS: ' + environment.baseUrl);
    window.addEventListener('storage', (event) => {
      if (event.key === 'accessToken') {
        this.globalService.logout();
      }
    });
  }
}
