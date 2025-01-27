import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../common/services/global.service';

import { FormsModule } from '@angular/forms';
import { LoginDto } from '../../common/types/all.types';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  schemas: [],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  credentials: LoginDto = { login: '', password: '' };

  constructor(
    private router: Router,
    private globalService: GlobalService,
  ) {}

  async login(event: Event): Promise<void> {
    event.preventDefault();

    const loggedIn = await this.globalService.login(this.credentials);

    if (!loggedIn) return;

    this.router.navigate(['dashboard']).then();
  }
}
