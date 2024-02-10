import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SweetAlertService } from '../services/alert/sweet-alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private _sweetService = inject(SweetAlertService);

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const messageError = err.error !== null ? err.error.message : err.message;
        const titleError = err.error !== null ? 'Error!!' : err.statusText;
        this._sweetService.showError(titleError, messageError);
        return throwError(() => err);
      })
    );
  }
}
