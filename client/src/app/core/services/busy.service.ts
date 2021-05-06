import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) {
  }

  async busy(): Promise<void> {
    this.busyRequestCount++;
    await this.spinnerService.show(undefined, {
      type: 'timer',
      bdColor: 'rgba(0, 0, 0, 0.1)',
      color: 'rgb(233,84,32)'
    });
  }

  async idle(): Promise<void> {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      await this.spinnerService.hide();
    }
  }
}
