import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BusyService} from '../services/busy.service';
import {delay, finalize} from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('email-exists')) {
      this.busyService.busy().then();
    }
    return next.handle(request).pipe(
      delay(800),
      finalize(async () => {
        await this.busyService.idle();
      })
    );
  }
}
