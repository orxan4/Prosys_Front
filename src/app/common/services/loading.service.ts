import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loadingStart(): void {
    this.loading$.next(true);
  }

  loadingEnd(): void {
    this.loading$.next(false);
  }
}
